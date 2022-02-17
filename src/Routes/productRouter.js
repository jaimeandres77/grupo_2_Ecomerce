const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multerProductMiddleware');
const validation = require('../middlewares/validationProductMiddleware');

const productController = require('../Controller/productController');

router.get('/detail/:id',productController.detail);

router.get('/create',productController.create);

router.post('/create', multer.single('imagen'),validation, productController.createSend);

router.get('/edit/:id', productController.edit);

router.patch('/edit/:id',productController.editUpdate);

router.delete('',productController.destroy);

module.exports = router;