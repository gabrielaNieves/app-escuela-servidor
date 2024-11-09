const { Docente } = require('../models');

// Crear un nuevo docente
exports.createDocente = async (req, res) => {
  try {
    const docente = await Docente.create(req.body);
    res.status(201).json(docente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los docentes
exports.getAllDocentes = async (req, res) => {
  try {
    const docentes = await Docente.findAll();
    res.status(200).json(docentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un docente por ID
exports.getDocenteById = async (req, res) => {
  try {
    const docente = await Docente.findByPk(req.params.id);
    if (!docente) {
      return res.status(404).json({ error: 'Docente no encontrado' });
    }
    res.status(200).json(docente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un docente
exports.updateDocente = async (req, res) => {
  try {
    const docente = await Docente.findByPk(req.params.id);
    if (!docente) {
      return res.status(404).json({ error: 'Docente no encontrado' });
    }
    await docente.update(req.body);
    res.status(200).json(docente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un docente
exports.deleteDocente = async (req, res) => {
  try {
    const docente = await Docente.findByPk(req.params.id);
    if (!docente) {
      return res.status(404).json({ error: 'Docente no encontrado' });
    }
    await docente.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
