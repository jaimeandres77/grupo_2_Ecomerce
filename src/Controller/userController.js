const {validationResult} = require('express-validator');

const User = require('../models/User');

module.exports = {
  register: (req, res) => {
    res.render('user/register');
  },
  processRegister: (req,res) => {
    const resultValidation = validationResult(req);
    /* if(req.body.password_repeat === req.body.password){

    } */
    if (resultValidation.errors.length > 0) {
        return res.render('user/register',{
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    }
    User.create(req.body);
    return res.send ('Ok, las validaciones se pasaron y no tienes errores');
  },
  login: (req, res) => {
      res.render('user/login');
  },
}

