'use strict';

var bcrypt = require('bcryptjs');

const claveEncriptada = bcrypt.hashSync('Carora2024', 10);


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Admin',
        apellido: 'Admin',
        usuario:'Administrador',
        clave: claveEncriptada,
        rolId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuarios', null, {});
  },
};
