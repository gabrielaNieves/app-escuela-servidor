const express = require('express');
const router = express.Router();
const docenteController = require('../controllers/docenteController');

router.post('/', docenteController.createDocente); // Crear un docente
router.get('/', docenteController.getAllDocentes); // Obtener todos los docentes
router.get('/:id', docenteController.getDocenteById); // Obtener un docente por ID
router.put('/:id', docenteController.updateDocente); // Actualizar un docente
router.delete('/:id', docenteController.deleteDocente); // Eliminar un docente

module.exports = router;
