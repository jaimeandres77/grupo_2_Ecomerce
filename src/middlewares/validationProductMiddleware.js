const {body,check} = require('express-validator');
const path = require('path');

const validateCreateForm = [
    body('name').not().isEmpty().withMessage('Debes rellenar el campo del Nombre del juego'),
    body('sku').not().isEmpty().withMessage('Debes asignarle un sku al juego'),
    body('price').not().isEmpty().withMessage('Debes asignarle un precio al juego'),
    body('discount').not().isEmpty().withMessage('Debes asignarle un descuento al juego al juego'),
    body('stock').not().isEmpty().withMessage('Debes asignarle una canidad de unidades al juego'),
    body('image').custom((value,{req}) => {
        const file = req.file;
        if(!file){
            return true;
        }else{
            const extensions = ['jpg','jpeg','png'];
            const extFile = path.extname(file.originalname);
            if(!extensions.includes(extFile)){
                throw new Error('Las extensiones permitidas son: '+extensions.join(', '));
            }
        }
    })
]

module.exports = validateCreateForm;