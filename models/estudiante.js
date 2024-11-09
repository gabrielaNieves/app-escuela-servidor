'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estudiante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Estudiante.belongsToMany(models.Padre, { 
        through: models.EstudiantePadre, 
        foreignKey: 'estudianteId', 
        otherKey: 'padreId',
        onDelete: 'CASCADE'
      });
    }
  }
  Estudiante.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    cedula: DataTypes.INTEGER,
    genero: DataTypes.STRING,
    nacionalidad: DataTypes.STRING,
    fechaDeNacimiento: DataTypes.DATEONLY,
    lugarDeNacimiento: DataTypes.STRING
  }
, {
    sequelize,
    modelName: 'Estudiante',
  });
  return Estudiante;
};