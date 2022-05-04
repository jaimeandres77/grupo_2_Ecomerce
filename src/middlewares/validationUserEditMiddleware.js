const {body} = require('express-validator');
const path = require('path');

const validationUserEditMiddleware = [
    body('fullname').notEmpty().withMessage('Tienes que escribir un nombre').bail().isLength({min: 4,max: 100}).withMessage('El nombre debe ser de 4 a 100 digitos y solo puede contener numeros, letras y guion bajo.'),
    body('domicilio').notEmpty().withMessage('Tienes que colocar una direccion').bail().isLength({min: 4,max: 100}).withMessage('El domicilio debe ser de 4 a 100 digitos y solo puede contener numeros, letras y guion bajo.'),
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
];

module.exports = validationUserEditMiddleware;