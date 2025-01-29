const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

router.post('/', cursoController.createCurso); // Crear un curso
router.get('/', cursoController.getAllCursos); // Obtener todos los cursos
router.get('/proxima-seccion', cursoController.obtenerProximaSeccion); //obtener próxima seccion
router.get('/:id', cursoController.getCursoById); // Obtener un curso por ID
router.put('/:id', cursoController.updateCurso); // Actualizar un curso
router.delete('/:id', cursoController.deleteCurso); // Eliminar un curso

module.exports = router;
