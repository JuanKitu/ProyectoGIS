"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
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
        return null;
    }
    start(callback) {
        this.httpServer.listen(this.app.get('port'), callback(1));
    }
}
exports.default = Server;
