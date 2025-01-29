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

const registroUsuario = async (req, res) => {
  const {nombre, apellido, usuario, clave, rolId} = req.body;

  try {
    //Buscar si usuario existe.
    const usuarioExistente = await Usuario.findOne({where:{ usuario }});
    if(usuarioExistente){
      return res.status(400).json({error: 'El usuario ya existe'});
    }

    //Encriptar clave
    const claveEncriptada = await bcrypt.hash(clave, 10);

    //creando Usuario
  const usuarioNuevo = await Usuario.create({
    nombre,
    apellido,
    usuario,
    clave: claveEncriptada,
    rolId
  });

  res.status(201).json({mensaje: 'Usuario registrado con exito!',  usuario: {id: usuarioNuevo.id, nombre: usuarioNuevo.nombre, usuario: usuarioNuevo.usuario, rol: usuarioNuevo.rolId}})
} catch (error) {
  res.status(500).json({ error: error.message });
}
  
}

const obtenerUsuarios = async (req, res) => {
  try {
    const usuariosLista = await Usuario.findAll({ attributes: ['id', 'nombre', 'apellido', 'usuario', 'rolId'] });

    res.status(200).json(usuariosLista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const usuarioPorId = async (req, res) => {

}

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'usuario no encontrado' });
    }
    await usuario.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

const cerrarSesion = async (req, res) => {
  try{
    res
    .clearCookie('token_acceso', {
      httpOnly: true,
      sameSite: 'strict',
    })
    .status(200)
    .json({mensaje: 'Sesión cerrada exitosamente!'});

  } catch (error) {
    res.status(500).json({Mensaje: 'error al cerrar sesión', error})
  }
}

module.exports= {
    login,
    registroUsuario,
    obtenerUsuarios,
    usuarioPorId,
    eliminarUsuario,
    cerrarSesion
}