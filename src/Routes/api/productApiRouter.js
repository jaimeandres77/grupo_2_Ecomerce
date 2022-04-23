const express = require('express');
const router = express.Router();
const productApiController = require('../../Controller/api/productApiController');

router.get('/all',productApiController.allList);
router.get('/',productApiController.pageList);
router.get('/:id',productApiController.detail);

module.exports = router;