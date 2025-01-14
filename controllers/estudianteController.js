'use strict';
const { Estudiante, Padre } = require('../models');

// Crear un estudiante junto con los padres asociados
exports.crearEstudiante = async (req, res) => {
  const { nombre, apellido, cedula, genero, nacionalidad, fechaDeNacimiento, lugarDeNacimiento, Padres } = req.body;

  try {
    // Crear el estudiante
    const estudiante = await Estudiante.create({
      nombre,
      apellido,
      cedula,
      genero,
      nacionalidad,
      fechaDeNacimiento,
      lugarDeNacimiento
    });

    // Crear los padres y asociarlos al estudiante
    const padresInstances = await Promise.all(
      Padres.map(async (padreData) => {
        const padre = await Padre.create(padreData);
        await estudiante.addPadre(padre);
        return padre;
      })
    );

    res.status(201).json({ estudiante, padres: padresInstances });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los estudiantes con sus padres
exports.buscarEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll({ include: Padre });
    res.status(200).json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un estudiante por ID con sus padres
exports.buscarEstudiantePorId = async (req, res) => {
  const { id } = req.params;

  try {
    const estudiante = await Estudiante.findByPk(id, {include: Padre });
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.status(200).json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un estudiante y los padres asociados
exports.actualizarEstudiante = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, cedula, genero, nacionalidad, fechaDeNacimiento, lugarDeNacimiento, Padres } = req.body;

  try {
    const estudiante = await Estudiante.findByPk(id, { include: Padre });
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    // Actualizar los datos del estudiante
    await estudiante.update({
      nombre,
      apellido,
      cedula,
      genero,
      nacionalidad,
      fechaDeNacimiento,
      lugarDeNacimiento
    });

    // Actualizar o crear padres
    await Promise.all(
      Padres.map(async (padreData) => {
        if (padreData.id) {
          // Si el padre existe, actualizar sus datos
          const padre = await Padre.findByPk(padreData.id);
          if (padre) {
            await padre.update(padreData);
          }
        } else {
          // Si el padre no existe, crearlo y asociarlo
          const nuevoPadre = await Padre.create(padreData);
          await estudiante.addPadre(nuevoPadre);
        }
      })
    );

    res.status(200).json({ estudiante, padres: await estudiante.getPadres() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un estudiante y sus padres asociados
exports.eliminarEstudiante = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el estudiante con sus padres
    const estudiante = await Estudiante.findByPk(id, { include: Padre });
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    // Eliminar los padres asociados
    for (const padre of estudiante.Padres) {
      await padre.destroy();
    }

    // Eliminar el estudiante
    await estudiante.destroy();

    res.status(204).json(); // Respuesta sin contenido indicando éxito
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
