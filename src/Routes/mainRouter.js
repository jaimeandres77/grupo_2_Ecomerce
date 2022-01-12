const express = require('express');
const router = express.Router();
const mainController = require('../Controller/mainController');

router.get('/', mainController.index);
module.exports= router;