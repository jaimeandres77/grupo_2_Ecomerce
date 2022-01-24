const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController');

router.get('/detail',productController.detail);

router.get('/create',productController.create);

router.get('/edit', productController.edit);

module.exports = router;