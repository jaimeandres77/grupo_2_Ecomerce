const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multerProductMiddleware');
const validation = require('../middlewares/validationProductMiddleware');

const productController = require('../Controller/productController');

router.get('/detail/:id',productController.detail);

router.get("/show",productController.show);

router.get('/create',productController.create);

router.post('/create', multer.single('image'),validation, productController.createSend);

router.get('/edit/:id', productController.edit);

router.patch('/edit/:id',multer.single('image'),validation,productController.editUpdate);

router.get('/delete/:id',productController.delete);

router.delete('/delete/:id',productController.destroy);

module.exports = router;