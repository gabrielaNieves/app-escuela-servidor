'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Padre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Padre.belongsToMany(models.Estudiante, { 
        through: models.EstudiantePadre, 
        foreignKey: 'padreId', 
        otherKey: 'estudianteId',
        onDelete: 'CASCADE'
      });
    }
  }
  Padre.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    cedula: DataTypes.INTEGER,
    fechaDeNacimiento: DataTypes.DATEONLY,
    estadoCivil: DataTypes.STRING,
    profesion: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    relacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Padre',
  });
  return Padre;
};
