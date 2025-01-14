'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Inscripcion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación: una inscripción pertenece a un estudiante
      Inscripcion.belongsTo(models.Estudiante, {
        foreignKey: 'estudianteId',
        onDelete: 'CASCADE', // Eliminar inscripción si se elimina el estudiante
      });

      // Relación: una inscripción pertenece a un curso
      Inscripcion.belongsTo(models.Curso, {
        foreignKey: 'cursoId',
        onDelete: 'CASCADE', // Eliminar inscripción si se elimina el curso
      });
    }
  }

  Inscripcion.init(
    {
      estudianteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Estudiantes',
          key: 'id',
        },
      },
      cursoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Cursos',
          key: 'id',
        },
      },
      fechaInscripcion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'activo',
      },
    },
    {
      sequelize,
      modelName: 'Inscripcion'
    }
  );

  return Inscripcion;
};
