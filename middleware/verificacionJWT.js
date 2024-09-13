const jwt = require('jsonwebtoken');
require('dotenv').config()

const verificarJWT = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401);
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token, 
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //token invalido
            req.usuario = decoded.usuario;
            next();
        }
    )
}

module.exports = verificarJWT