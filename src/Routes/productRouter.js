const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController');

router.get('/detail',productController.detail);

module.exports = router;