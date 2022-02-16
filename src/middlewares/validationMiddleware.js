const {body} = require('express-validator');
const path = require('path');

const validationMiddleware = [
    body('fullname').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('username').notEmpty().withMessage('Tienes que escribir un nombre de usuario'),
    body('date').notEmpty().withMessage('Selecciona una fecha de nacimiento'),
    body('domicilio').notEmpty().withMessage('Tienes que escribir una direccion de domicilio'),
    body("perfil").notEmpty().withMessage('Tienes que seleccionar un Genero'),
    body("categories").notEmpty().withMessage('selecciona 1 o más intereses'),
    body("password").notEmpty().withMessage('Escribe una contraseña'),
    body("password_repeat").notEmpty().withMessage('La contraseña no coincide'),
    body("email").notEmpty().withMessage('Tienes que escribir un email valido').bail()
    .isEmail().withMessage('Debes escribir un formato de correo valido'),
    body("country").notEmpty().withMessage('selecciona un país'),
    body('avatar').custom((value, {req}) => {
        let file = req.file;
        if(!file) {
            throw new Error('Tienes que subir una imagen');
        }else{
            let acceptedExtensions = ['.jpg', '.png', '.gif','.jfif'];
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(',')}`);
            }
        }
        return true;
    })
]

module.exports = validationMiddleware;