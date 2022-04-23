const express = require('express');
const router = express.Router();
const saleController = require('../Controller/SaleController');

router.get('/',saleController.list);
router.post('/save',saleController.guardar);
router.delete('/:id',saleController.quitar);
router.post('/send',saleController.complete);

module.exports = router;