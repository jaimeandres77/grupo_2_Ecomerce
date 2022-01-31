const express = require("express");
const router = express.Router();

const userController = require ("../Controller/userController");


// Formulario registro
router.get('/register', userController.register);

// Procesar el registro
router.post('/register',userController.processRegister);


router.get('/login', userController.login);


module.exports= router;