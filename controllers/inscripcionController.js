'use strict';
const { Inscripcion, Estudiante, Curso } = require('../models');

// Crear una nueva inscripción
exports.crearInscripcion = async (req, res) => {
  const { estudianteId, cursoId, estado, fechaDeInscripcion } = req.body;

  try {
    // Validar la existencia del estudiante y curso
    const estudiante = await Estudiante.findByPk(estudianteId);
    const curso = await Curso.findByPk(cursoId);

    if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });
    if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });

    // Verificar si el estudiante ya está inscrito en el curso
    const inscripcionExistente = await Inscripcion.findOne({
      where: { estudianteId, cursoId },
    });

    if (inscripcionExistente) {
      return res.status(400).json({ message: "El estudiante ya está inscrito en este curso." });
    }
    
    // Crear la inscripción
    const inscripcion = await Inscripcion.create({
      estudianteId,
      cursoId,
      estado,
      fechaDeInscripcion
    });

    res.status(201).json({ message: 'Inscripción creada exitosamente', inscripcion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las inscripciones
exports.buscarInscripciones = async (req, res) => {
  const { genero, cursoId, estado } = req.query;
  const whereConditions = {};

  if (genero) whereConditions['$Estudiante.genero$'] = genero;
  if (cursoId) whereConditions['CursoId'] = cursoId;
  if (estado) whereConditions.estado = estado;

  try {
    const inscripciones = await Inscripcion.findAll({
      where: whereConditions,
      include: [
        { model: Estudiante, attributes: ['id', 'nombre', 'apellido', 'genero'] },
        { model: Curso, attributes: ['id', 'grado', 'seccion']}
      ]
    });

    res.status(200).json(inscripciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una inscripción por ID
exports.buscarInscripcionPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const inscripcion = await Inscripcion.findByPk(id, {
      include: [
        { model: Estudiante, attributes: ['id', 'nombre', 'apellido'] },
        { model: Curso, attributes: ['id', 'grado', 'seccion'] }
      ]
    });

    if (!inscripcion) return res.status(404).json({ error: 'Inscripción no encontrada' });

    res.status(200).json(inscripcion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una inscripción
exports.actualizarInscripcion = async (req, res) => {
  const { id } = req.params;
  const { estado, cursoId } = req.body;

  try {
    const inscripcion = await Inscripcion.findByPk(id);

    if (!inscripcion) return res.status(404).json({ error: 'Inscripción no encontrada' });

    // Validar la existencia del curso si se actualiza
    if (cursoId) {
      const curso = await Curso.findByPk(cursoId);
      if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });
    }

    // Actualizar la inscripción
    await inscripcion.update({ estado, cursoId });

    res.status(200).json({ message: 'Inscripción actualizada exitosamente', inscripcion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una inscripción
exports.eliminarInscripcion = async (req, res) => {
  const { id } = req.params;

  try {
    const inscripcion = await Inscripcion.findByPk(id);

    if (!inscripcion) return res.status(404).json({ error: 'Inscripción no encontrada' });

    // Eliminar la inscripción
    await inscripcion.destroy();

    res.status(200).json({ message: 'Inscripción eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
