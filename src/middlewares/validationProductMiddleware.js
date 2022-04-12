const {body,check} = require('express-validator');
const path = require('path');

const validateCreateForm = [
    body('name').not().isEmpty().withMessage('El nombre no puede estar vacio').bail().isLength({min: 5}).withMessage('El nombre del juego debe tener minimo 5 caracteres'),
    body('sku').not().isEmpty().withMessage('El SKU no debe estar vacio').bail().isLength({min: 5,max: 50}).withMessage('El SKU del juego debe tener minimo 5 caracteres y maximo 50 caracteres'),
    body('price').not().isEmpty().withMessage('Debe asignarle un precio al juego').bail().isLength({min: 1}).withMessage('El precio debe tener minimo el valor de 1'),
    body('stock').not().isEmpty().withMessage('Debes colocar la cantidad inicial del producto').bail().isLength({min: 0}).withMessage('El stock debe ser como minimo de 0'),
    body('description').not().isEmpty().withMessage('La descripción no puede estar vacio').bail().isLength({min: 20, max:500}).withMessage('El nombre del juego debe tener minimo 5 caracteresLa descripcion del juego debe tener minimo 20 caracteres y maximo 500 caracteres'),
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