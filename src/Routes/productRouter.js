const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multerProductMiddleware');
const validation = require('../middlewares/validationProductMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const productController = require('../Controller/productController');

router.get('/detail/:id',productController.detail);

router.get("/show",adminMiddleware,productController.show);

router.get('/create',adminMiddleware,productController.create);

router.post('/create',adminMiddleware, multer.single('image'),validation, productController.createSend);

router.get('/edit/:id',adminMiddleware, productController.edit);

router.patch('/edit/:id',adminMiddleware,multer.single('image'),validation,productController.editUpdate);

router.delete('/delete/:id',adminMiddleware,productController.destroy);

module.exports = router;