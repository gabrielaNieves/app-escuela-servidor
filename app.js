const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()
const cors = require('cors');
const verificarJWT = require('./middleware/verificacionJWT.js')
const port = process.env.PORT || 3001;

// Intercambio de fuentes de origenes cruzados.
const website = ['http://localhost:3000'] //Dirección URl que hace solicitud al servidor
const corsOptions = {
    origin:(origin, callback) => {
        if(website.indexOf(origin) !== -1){
           return callback(null, true)
        } 
        if(!origin){
            return callback(null, true)
        }else {
            callback(new Error('No permitido por CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

const userRoutes = require('./routes/usersRoutes.js');
const cursoRoutes = require('./routes/cursoRoutes.js');
const docenteRoutes = require('./routes/docenteRoutes.js');
const estudianteRoutes = require('./routes/estudianteRoutes.js');

app.get('/', (req, res) => {
    res.send('App enviando datos');
});


app.use('/usuarios', userRoutes);
app.use('/cursos', cursoRoutes);
app.use('/docentes', docenteRoutes);
app.use('/estudiantes', estudianteRoutes);

app.use(verificarJWT);
app.get('/adminBoard', (req, res) => {
    res.send('Panel Administrador de aplicación');
});

app.listen(port, () => {
    console.log('Port ==>', port)
})