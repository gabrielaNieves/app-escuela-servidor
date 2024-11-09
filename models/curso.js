'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Curso.belongsTo(models.Docente, {
        foreignKey: 'docenteId',
        onDelete: 'SET NULL', // Al eliminar el profesor, el curso mantiene su existencia pero sin profesor
      });
    }
  }
  Curso.init({
    titulo: DataTypes.STRING,
    docenteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Curso',
  });
  return Curso;
};