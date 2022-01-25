const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController');

router.get('/detail',productController.detail);
router.get("/show",productController.show);

module.exports = router;