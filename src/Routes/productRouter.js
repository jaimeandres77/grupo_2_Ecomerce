const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multerProductMiddleware');
const validation = require('../middlewares/validationProductMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const productController = require('../Controller/productController');

router.get('/detail/:id',productController.detail);

router.get("/show",authMiddleware,productController.show);

router.get('/create',authMiddleware,productController.create);

router.post('/create',authMiddleware, multer.single('image'),validation, productController.createSend);

router.get('/edit/:id',authMiddleware, productController.edit);

router.patch('/edit/:id',authMiddleware,multer.single('image'),validation,productController.editUpdate);

router.delete('/delete/:id',authMiddleware,productController.destroy);

module.exports = router;