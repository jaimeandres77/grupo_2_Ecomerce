const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../Controller/productController');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.resolve(__dirname,'./../../public/img'));
    },
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}_product${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage})

router.get('/detail',productController.detail);

router.get('/create',productController.create);

router.post('/create', upload.single('imagen') , productController.createSend);

router.get('/edit/:id', productController.edit);

router.put('/',productController.editUpdate);

module.exports = router;