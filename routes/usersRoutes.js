const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');


router.post('/registro', userController.registroUsuario);
router.post('/login', userController.login);
router.post('/cerrarSesion', userController.cerrarSesion);
router.get('/', userController.obtenerUsuarios);
router.delete('/:id', userController.eliminarUsuario);

module.exports = router;