const {body,check} = require('express-validator');
const path = require('path');

const validateCreateForm = [
    body('name').not().isEmpty().withMessage('El nombre no puede estar vacio'),
    body('sku').not().isEmpty().withMessage('El SKU no debe estar vacio'),
    body('price').not().isEmpty().withMessage('Debe asignarle un precio al juego'),
    body('stock').not().isEmpty().withMessage('Debes colocar la cantidad inicial del producto'),
    body('platform').notEmpty().withMessage('Debe seleccionar al menos una plataforma'),
    body('genre').notEmpty().withMessage('Debe seleccionar al menos un genero'),
    body('image').custom((value,{req}) => {
        const file = req.file;
        if(!file){
            return true;
        }else{
            const extensions = ['.jpg','.jpeg','.png'];
            const extFile = path.extname(file.originalname);
            if(!extensions.includes(extFile)){
                throw new Error('Las extensiones permitidas son: '+extensions.join(', '));
            }
            return true;
        }
    })
]

module.exports = validateCreateForm;