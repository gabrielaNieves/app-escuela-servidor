const { Curso } = require('../models');

// Crear un nuevo curso
exports.createCurso = async (req, res) => {
  try {
    const curso = await Curso.create(req.body);
    res.status(201).json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los cursos
exports.getAllCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un curso por ID
exports.getCursoById = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un curso
exports.updateCurso = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    await curso.update(req.body);
    res.status(200).json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un curso
exports.deleteCurso = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    await curso.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
