'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EstudiantePadre extends Model {}

  EstudiantePadre.init({
    estudianteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Estudiantes', // Nombre de la tabla de estudiantes en la base de datos
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    padreId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Padres', // Nombre de la tabla de padres en la base de datos
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'EstudiantePadre',
    tableName: 'estudiante_padres', // Nombre de la tabla en la base de datos
    timestamps: false
  });

  return EstudiantePadre;
};
