const {body} = require('express-validator');
const path = require('path');

const validationMiddleware = [
    body('fullname').notEmpty().withMessage('Tienes que escribir un nombre').bail().isLength({min: 4,max: 16}).withMessage('El nombre debe ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo.'),
    body('username').notEmpty().withMessage('Tienes que escribir un nombre de usuario').bail().isLength({min: 4,max: 16}).withMessage('El usuario debe ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo.'),
    body('date_of_birth').notEmpty().withMessage('Selecciona una fecha de nacimiento'),
    body('domicilio').notEmpty().withMessage('Tienes que escribir una direccion de domicilio'),
    body("perfil").notEmpty().withMessage('Tienes que seleccionar un Genero'),
    body("categories").notEmpty().withMessage('selecciona 1 o más intereses'),
    body("password").notEmpty().withMessage('Escribe una contraseña').bail().isLength({min: 4,max: 16}).withMessage('La contraseña tiene que ser de 4 a 12 digitos.'),
    body("password_repeat").notEmpty().withMessage('La contraseña no coincide').bail().isLength({min: 4,max: 16}).withMessage('La contraseña tiene que ser de 4 a 12 digitos.'),
    body("email").notEmpty().withMessage('Tienes que escribir un email valido').bail()
    .isEmail().withMessage('Debes escribir un formato de correo valido'),
    body("country").notEmpty().withMessage('Selecciona un país'),
    body('avatar').custom((value, {req}) => {
        let file = req.file;
        if(file) {
            let acceptedExtensions = ['.jpg', '.png', '.gif'];
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(',')}`);
            }
        }
        return true;
    })
]

module.exports = validationMiddleware;