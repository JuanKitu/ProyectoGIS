const Server = require('../dist/classes/server');
const { json } = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieparser = require('cookie-parser');
colors = require('colors');
const cors = require('cors');

/*settings*/
const server = Server.default.instance;
//app.use(cookieParser());

/*importing routes*/
const ensayosRoutes = require('./routes/ensayos');
const ambientesRoutes = require('./routes/ambientes');
const parametrosRoutes = require('./routes/parametros');
const parametros_archivadosRoutes = require('./routes/parametros_archivados');
const usuariosRoutes = require('./routes/usuarios');
const ensayo_archivadosRoutes = require('./routes/ensayos_archivados');
/* middleware */
server.app.use(morgan('dev'));
server.app.use(json());

// Configurar cabeceras y cors
const corsOptions = { // se debe configurar mas adelante
    origin: 'http://localhost:8100',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
server.app.use(cors());



/* routes */
server.app.use('/api/ensayos', ensayosRoutes);
server.app.use('/api/ambientes', ambientesRoutes);
server.app.use('/api/parametros', parametrosRoutes);
server.app.use('/api/parametros_archivados', parametros_archivadosRoutes);
server.app.use('/api/usuarios', usuariosRoutes);
server.app.use('/api/ensayos_archivados', ensayo_archivadosRoutes);

console.log(new Date());
server.start(() => {
    console.log(`Server on port: ${server.app.get('port')}`.blue);
});