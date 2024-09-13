'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rols', [
      {
        tipo: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipo: 'Colaborador',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rols', null, {});
  },
};
