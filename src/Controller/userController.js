const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = {
  register: (req, res) => {
    res.render('user/register');
  },
  processRegister: (req,res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render('user/register',{errors: resultValidation.mapped(),oldData: req.body});
    }
    const email = User.findByField('email',req.body.email);
    const password = req.body.password === req.body.password_repeat && req.body.password.length > 0 ? false : true;
    if(email){
      if(password){
        return res.render('user/register',{errors: resultValidation.mapped(),errors: {email: {msg: 'Correo ya existente'},password: {msg: 'Las contraseñas no son iguales'}},oldData: req.body});
      }
      return res.render('user/register',{errors: resultValidation.mapped(),errors: {email: {msg: 'Correo ya existente'}},oldData: req.body});
    }
    if(password){
      return res.render('user/register',{errors: resultValidation.mapped(),errors: {password: {msg: 'Las contraseñas no son iguales'}},oldData: req.body});
    }

    delete req.body.password_repeat;
    const newUser = {
      ... req.body,
      password: bcrypt.hashSync(req.body.password,10),
      image: req.file.filename,
    }
    User.create(newUser);
    return res.redirect('/user/login');
  },
  login: (req, res) => {
    res.render('user/login');
  },
  loginProcess: (req,res) => {
    const userToLogin = User.findByField('email',req.body.email);
    const isOkThePassword = req.body.password !== undefined ? bcrypt.compareSync(req.body.password,userToLogin.password) : false;
    if(userToLogin && isOkThePassword){
      res.send('Ok');
    }
    res.render('user/login',{errors: {email: {msg: 'No se encuentra este email en nuestra Base de Datos o la contraseña es incorrecta'}}, oldData: req.body});
  }
}

