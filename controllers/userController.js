// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/');
require('dotenv').config()

const login = async (req, res) => {

  const { usuario, clave } = req.body;
  
  try {
    // Buscar al usuario por el nombre de usuario
    const  userLogin = await Usuario.findOne({ where: { usuario: usuario} });
    if (!userLogin) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña es correcta
    const claveValida = await bcrypt.compare(clave, userLogin.clave);
    
    if (!claveValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: userLogin.id, usuario: userLogin.usuario, rol: userLogin.rolId}, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Devolver el token y el usuario autenticado
    res.status(200)
    .cookie('token_acceso', token, {
      httpOnly: true, // cookie solo se puede acceder en el servidor
      sameSite: 'strict', // Solo se puede acceder en el mismo dominio
      maxAge: 1000*60*60 // cookie tiempo validez 1 hora
    })
    .json({ 
      message: 'Autenticación exitosa',
      token,
      usuario: {
        id: userLogin.id,
        usuario: userLogin.usuario,
        rol: userLogin.rolId
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

module.exports= {
    login
}