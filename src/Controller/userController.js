const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const db = require('../database/models');

module.exports = {
  register: async (req, res) => {
    try {
      const genres = await db.Genres.findAll({ order: [['name', 'ASC']] });
      res.render('user/register', { genres });
    } catch (error) {
      console.log(error);
    }
  },
  processRegister: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        return res.render('user/register', { errors: resultValidation.mapped(), oldData: req.body });
      }
      const { fullname, username, date_of_birth, domicilio, perfil, categories, password, password_repeat, email, country } = req.body;
      const verificarEmail = await db.Users.findOne({ where: { email } });
      const verificarUsername = await db.Users.findOne({ where: { username } });
      if (verificarEmail && verificarUsername) {
        return res.render('user/register', { errors: resultValidation.mapped(), errors: { email: { msg: 'Ya existe este correo electronico' }, username: { msg: 'Ya existe este nombre de usuario' } }, oldData: req.body });
      } else if (verificarEmail) {
        return res.render('user/register', { errors: resultValidation.mapped(), errors: { email: { msg: 'Ya existe este correo electronico' } }, oldData: req.body });
      } else if (verificarUsername) {
        return res.render('user/register', { errors: resultValidation.mapped(), errors: { username: { msg: 'Ya existe este nombre de usuario' } }, oldData: req.body });
      }
      if (password !== password_repeat) {
        return res.render('user/register', { errors: resultValidation.mapped(), errors: { password: { msg: 'Las contraseñas no son iguales' } }, oldData: req.body });
      }
      const user = await db.Users.create({
        fullname,
        email,
        username,
        password: bcrypt.hashSync(password, 10),
        date_of_birth,
        country,
        profileimage: req.file?.filename || 'default-user.svg',
        sex: perfil
      });
      return res.redirect('/user/login');
    } catch (error) {
      console.log(error);
    }
  },
  login: (req, res) => {
    res.render('user/login');
  },
  loginProcess: async (req, res) => {
    try {
      const { email, password } = req.body;
      const findEmail = await db.Users.findOne({ where: { email } }, { include: { attributes: ['id', 'password'] } });
      const findUsername = await db.Users.findOne({ where: { username: email } }, { include: { attributes: ['id', 'password'] } });
      if (findEmail || findUsername) {
        const isOkThePassword = findEmail ? bcrypt.compareSync(password, findEmail.password) : findUsername ? bcrypt.compareSync(password, findUsername.password) : false;
        if (isOkThePassword) {
          let user;
          const attributes = ['fullname','username','email','profileimage']
          if (findEmail) {
            user = await db.Users.findByPk(findEmail.id, { attributes });
          } else if (findUsername) {
            user = await db.Users.findByPk(findUsername.id, { attributes });
          }
          req.session.userLogged = user;
          if (req.body.recordar) {
            res.cookie('userEmail', user.email, { maxAge: (1000 * 60) * 1 });
          }
          return res.redirect('/user/profile');
        }
      } else {
        console.log('no se encuentra registrado');
        return res.render('user/login', { errors: { email: { msg: 'No se encuentra el nombre de usuario o email, o la contraseña esta equivocada' } }, oldData: req.body });
      }
      res.redirect('/user/login');
    } catch (error) {
      console.log(error);
    }
    // const userToLogin = User.findByField('email', req.body.email);
    // if (userToLogin) {
    //   const isOkThePassword = req.body.password !== undefined ? bcrypt.compareSync(req.body.password, userToLogin.password) : false;
    //   if (isOkThePassword) {
    //     delete userToLogin.password;
    //     req.session.userLogged = userToLogin;

    //     if (req.body.recordar) {
    //       res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 1 });
    //     }

    //     return res.redirect('/user/profile');
    //   }
    // }
    // return res.render('user/login', { errors: { email: { msg: 'No se encuentra este email en nuestra Base de Datos o la contraseña es incorrecta' } }, oldData: req.body });
  },
  profile: (req, res) => {
    res.render('user/profile', { user: req.session.userLogged });
  },
  logout: (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/user/login');
  }
}

