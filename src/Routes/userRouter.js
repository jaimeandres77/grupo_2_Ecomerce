/* Express */
const express = require("express");
const router = express.Router();
/* Controladores */
const userController = require("../Controller/userController");
/* Middleware */
const validation = require('../middlewares/validationMiddleware');
const multer = require('../middlewares/multerRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


// Formulario registro
router.get('/register', guestMiddleware, userController.register);

// Procesar el registro
router.post('/register', multer.single('avatar'), validation, userController.processRegister);

//Formulario Edicion
router.get("/showUsers",userController.showUser);

//Formulario de login
router.get('/login', guestMiddleware, userController.login);

// Procesar de login
router.post('/login', multer.single('avatar'), validation, userController.loginProcess);

router.get('/profile', authMiddleware, userController.profile);

router.get('/logout', userController.logout)


module.exports = router;