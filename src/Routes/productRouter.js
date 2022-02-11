const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../Controller/productController');
const {body,check} = require('express-validator');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.resolve(__dirname,'./../../public/img'));
    },
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}_product${path.extname(file.originalname)}`)
    }
});

const validateCreateForm = [
    body('nombre').not().isEmpty().withMessage('Debes rellenar el campo del Nombre del producto'),
    body('precio').not().isEmpty().withMessage('Debes asignarle un precio al producto'),
    body('sku').not().isEmpty().withMessage('Debes asignarle un sku al producto'),
]

const upload = multer({storage})

router.get('/detail',productController.detail);

router.get('/create',productController.create);

router.post('/create', upload.single('imagen'),validateCreateForm, productController.createSend);

router.get('/edit/:id', productController.edit);

router.put('/',productController.editUpdate);

module.exports = router;