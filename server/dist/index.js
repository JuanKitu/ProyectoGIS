"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const express_1 = require("express");
const cli_color_1 = __importDefault(require("cli-color"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//const morgan = require('morgan');
//const path = require('path');
//const cookieparser = require('cookie-parser');
//const cors = require('cors');
/*settings*/
const server = server_1.default.instance;
//app.use(cookieParser());
/*importing routes*/
//const ensayosRoutes = require('./routes/ensayos');
const ensayos_1 = __importDefault(require("./routes/ensayos"));
const ambientes_1 = __importDefault(require("./routes/ambientes"));
const parametros_1 = __importDefault(require("./routes/parametros"));
const parametros_archivados_1 = __importDefault(require("./routes/parametros_archivados"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const ensayos_archivados_1 = __importDefault(require("./routes/ensayos_archivados"));
/* middleware */
server.app.use(morgan_1.default('dev'));
server.app.use(express_1.json());
// Configurar cabeceras y cors
const corsOptions = {
    origin: 'http://localhost:8100',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
server.app.use(cors_1.default());
/* routes */
server.app.use('/api/ensayos', ensayos_1.default);
server.app.use('/api/ambientes', ambientes_1.default);
server.app.use('/api/parametros', parametros_1.default);
server.app.use('/api/parametros_archivados', parametros_archivados_1.default);
server.app.use('/api/usuarios', usuarios_1.default);
server.app.use('/api/ensayos_archivados', ensayos_archivados_1.default);
console.log(new Date());
server.start(() => {
    console.log(cli_color_1.default.magenta.inverse.bold(`Server on port: ${server.app.get('port')}`));
});
