const express = require('express');
const router = express.Router();
const productApiController = require('../../Controller/api/productApiController');

router.get('/',productApiController.list);
router.get('/:id',productApiController.detail);

module.exports = router;