const {body,check} = require('express-validator');
const path = require('path');

const validateCreateForm = [
    body('nombre').not().isEmpty().withMessage('Debes rellenar el campo del Nombre del producto'),
    body('precio').not().isEmpty().withMessage('Debes asignarle un precio al producto'),
    body('sku').not().isEmpty().withMessage('Debes asignarle un sku al producto'),
    body('imagen').custom((value,{req}) => {
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