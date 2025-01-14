const express = require('express');
const router = express.Router();
const inscripcionController = require('../controllers/inscripcionController');

router.post('/', inscripcionController.crearInscripcion);
router.get('/', inscripcionController.buscarInscripciones);
router.get('/:id', inscripcionController.buscarInscripcionPorId);
router.put('/:id', inscripcionController.actualizarInscripcion);
router.delete('/:id', inscripcionController.eliminarInscripcion);

module.exports = router;