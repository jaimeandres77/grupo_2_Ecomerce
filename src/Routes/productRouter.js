const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController');

router.get('/detail',productController.detail);

// Registro del producto
router.get('/create',productController.create);
// router.???('/',productController.store);

// Actualizacion de producto ya existente
router.get('/edit/:id', productController.edit);
// router.???('/',productController.update);

// Eliminacion del producto
// router.???('/delete/:id',productController.destroy);

module.exports = router;