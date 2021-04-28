import Server from './classes/server';
import {json} from 'express';
import clc from 'cli-color';
import morgan from 'morgan';
import path from 'path';
import cookieparser from 'cookie-parser';
import cors from 'cors'
import bodyParser from 'body-parser';

//const morgan = require('morgan');
//const path = require('path');
//const cookieparser = require('cookie-parser');
//const cors = require('cors');
/*settings*/
const server = Server.instance;
//app.use(cookieParser());

/*importing routes*/
//const ensayosRoutes = require('./routes/ensayos');
import ensayosRoutes from './routes/ensayos'
import ambientesRoutes from './routes/ambientes';
import parametrosRoutes  from './routes/parametros';
import parametros_archivadosRoutes  from './routes/parametros_archivados';
import usuariosRoutes  from './routes/usuarios';
import ensayo_archivadosRoutes from './routes/ensayos_archivados';
import socket from './routes/socket'
/* middleware */
server.app.use(morgan('dev'));
server.app.use(json());



//const io = require('socket.io')(3001);

//body-parser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );
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
server.app.use('/api/socket', socket);

console.log(new Date());

server.start(()=>{
    console.log(clc.magenta.inverse.bold(`Server on port: ${server.app.get('port')}`));
}, "192.168.0.159" );
