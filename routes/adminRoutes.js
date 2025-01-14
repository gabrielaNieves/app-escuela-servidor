const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Ruta para obtener totales
router.get('/totales', adminController.obtenerTotales);
router.get('/totalInscripciones', adminController.obtenerTotalInscripcion);

module.exports = router;