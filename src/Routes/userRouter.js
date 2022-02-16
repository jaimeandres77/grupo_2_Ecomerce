/* Express */
const express = require("express");
const router = express.Router();
/* Controladores */
const userController = require ("../Controller/userController");
/* Middleware */
const validation = require('../middlewares/validationMiddleware');
const multer = require('../middlewares/multerRegisterMiddleware');

// Formulario registro
router.get('/register', userController.register);

// Procesar el registro
router.post('/register', multer.single('avatar'),validation,userController.processRegister);

//Formulario de login
router.get('/login', userController.login);


module.exports= router;