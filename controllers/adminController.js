const { Estudiante, Docente, Curso, Inscripcion } = require('../models');

exports.obtenerTotales = async (req, res) => {
  try {
    // Contar el total de estudiantes
    const totalEstudiantes = await Estudiante.count();

    // Contar el total de docentes
    const totalDocentes = await Docente.count();

    // Contar el total de cursos
    const totalCursos = await Curso.count();

    res.status(200).json({
      totalEstudiantes,
      totalDocentes,
      totalCursos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los totales' });
  }
};

exports.obtenerTotalInscripcion = async (req, res) => {
    try {
      // Contar el total y buscar inscripciones
      const { count , rows } = await Inscripcion.findAndCountAll({
        include: [
          { model: Estudiante, attributes: ['id', 'nombre', 'apellido', 'genero'] },
          { model: Curso, attributes: ['id', 'grado', 'seccion'] }
        ],
        limit: 5,
        order: [['id', 'DESC']]
      });
      const total = count;
      const inscripciones = rows;
      res.status(200).json({
        total,
        inscripciones
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los totales' });
    }
  };