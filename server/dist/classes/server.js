"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const socket = __importStar(require("../socket/socket"));
//Aca habria que importar el archivos de sockets personalizado
class Server {
    constructor() {
        this.app = express_1.default();
        //settings
        this.app.set('port', 3000);
        this.app.set('json spaces', 2);
        //configurando el socket
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        //escuchando propiedades del socket
        this.escucharSockets();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    escucharSockets() {
        console.log('escuchando conexiones - sockets');
        this.io.on('connection', client => {
            console.log('Cliente conectado');
            // Conectar cliente
            socket.conectarCliente(client);
            // Desconectar
            socket.desconectar(client);
            //Parametros
            socket.recibirStrem(client);
        });
    }
    start(callback) {
        this.httpServer.listen(this.app.get('port'), callback(1));
    }
}
exports.default = Server;
