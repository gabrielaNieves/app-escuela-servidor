'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('estudiante_padres', {
      estudianteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Estudiantes', // Nombre de la tabla de estudiantes en la base de datos
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      padreId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Padres', // Nombre de la tabla de padres en la base de datos
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('estudiante_padres');
  }
};
