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
const adminMiddleware = require('../middlewares/adminMiddleware');
const validationUserEditMiddleware = require('../middlewares/validationUserEditMiddleware');

//Detalle Usuario
router.get('/detail/:id',userController.detail);

//Formulario Edición
router.get('/edit/:id',[adminMiddleware],userController.editUser);

//Formulario Edición
router.put('/edit/:id',[multer.single('avatar'),validationUserEditMiddleware],userController.userUpdated);

// Formulario registro
router.get('/register', guestMiddleware, userController.register);

// Procesar el registro
router.post('/register', multer.single('avatar'), validation, userController.processRegister);

// Eliminar Usuario
router.delete('/delete/:id',[adminMiddleware],userController.delete);

//Listado Usuario
router.get("/showUsers",[adminMiddleware],userController.showUser);

//Formulario de login
router.get('/login', guestMiddleware, userController.login);

// Procesar de login
router.post('/login', multer.single('avatar'), validation, userController.loginProcess);

router.get('/profile', authMiddleware, userController.profile);

router.get('/logout', userController.logout)


module.exports = router;