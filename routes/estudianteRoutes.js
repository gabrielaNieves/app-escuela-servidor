const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

router.post('/', estudianteController.crearEstudiante);
router.get('/', estudianteController.buscarEstudiantes);
router.get('/:id', estudianteController.buscarEstudiantePorId);
router.put('/:id', estudianteController.actualizarEstudiante);
router.delete('/:id', estudianteController.eliminarEstudiante);

module.exports = router;
