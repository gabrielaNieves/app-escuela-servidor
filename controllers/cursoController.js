const { Curso, Docente } = require('../models');

// Crear un nuevo curso
exports.createCurso = async (req, res) => {
  try {
    const { grado, docenteId } = req.body;

    // Obtener todos los cursos existentes
    const cursosExistentes = await Curso.findAll();

    // Verificar si el docente ya tiene un curso asignado
    const docenteAsignado = cursosExistentes.find(curso => curso.docenteId == docenteId);
    if (docenteAsignado) {
      return res.status(400).json({ error: 'Este docente ya está asignado a un curso.' });
    }

    // Obtener cursos del mismo grado para asignar la sección
    const cursosMismoGrado = cursosExistentes.filter(curso => curso.grado === grado);

    // Definir las secciones permitidas
    const seccionesPermitidas = ['A', 'B', 'C', 'D'];

    // Determinar la siguiente sección disponible
    let nuevaSeccion = 'A';
    if (cursosMismoGrado.length > 0) {
      const seccionesUsadas = cursosMismoGrado.map(curso => curso.seccion);
      const ultimaSeccion = seccionesUsadas.sort().pop(); // Última sección usada

      // Obtener el índice de la última sección y verificar si hay espacio para una nueva
      const indiceUltima = seccionesPermitidas.indexOf(ultimaSeccion);
      if (indiceUltima < seccionesPermitidas.length - 1) {
        nuevaSeccion = seccionesPermitidas[indiceUltima + 1];
      } else {
        return res.status(400).json({ error: 'No se pueden crear más secciones para este grado.' });
      }
    }

    // Crear el nuevo curso con la sección asignada y el docente asociado
    const nuevoCurso = await Curso.create({ grado, seccion: nuevaSeccion, docenteId });

    res.status(201).json(nuevoCurso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Buscar la proxima sección
exports.obtenerProximaSeccion = async (req, res) => {
  const { grado } = req.query;

  try {
    const gradoNumerico = parseInt(grado, 10);
    if (isNaN(gradoNumerico) || gradoNumerico < 1 || gradoNumerico > 6) {
      return res.status(400).json({ message: 'Grado inválido' });
    }

    const cursosExistentes = await Curso.findAll({
      where: { grado: gradoNumerico },
      order: [['seccion', 'ASC']]
    });

    let nuevaSeccion = 'A';
    if (cursosExistentes.length > 0) {
      const ultimaSeccion = cursosExistentes[cursosExistentes.length - 1].seccion;
      if (ultimaSeccion >= 'D') {
        return res.status(400).json({ message: 'No se pueden crear más de 4 secciones (A-D) para este grado' });
      }
      nuevaSeccion = String.fromCharCode(ultimaSeccion.charCodeAt(0) + 1);
    }

    res.status(200).json({ seccion: nuevaSeccion });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la próxima sección', error: error.message });
  }
};

// Obtener todos los cursos
exports.getAllCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll({
      include: {
        model: Docente,
        attributes: ['nombre', 'apellido']

      }
    });
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
