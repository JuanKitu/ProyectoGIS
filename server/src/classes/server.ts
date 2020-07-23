import express from 'express';
import socketIO from 'socket.io';
import http from 'http';

//Aca habria que importar el archivos de sockets personalizado

export default class Server {
    private static _instance: Server;
    public app: express.Application;
    public io: socketIO.Server;
    private httpServer: http.Server;
    private constructor(){
        this.app = express();
        //settings
        this.app.set('port',3000);
        this.app.set('json spaces', 2);
        //configurando el socket
        this.httpServer = new http.Server (this.app);
        this.io = socketIO( this.httpServer );
        //escuchando propiedades del socket
        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || ( this._instance = new this() );
    }

    private escucharSockets() {

        console.log('escuchando conexiones - sockets');

        /*this.io.on('connection', client => {
            
            console.log('Cliente conectado');

            // Conectar cliente
            socket.conectarCliente( cliente, this.io );

            // Desconectar
            socket.desconectar( cliente, this.io );    
        

        });*/

        //return null;
    }

    start( callback: Function ) {

        this.httpServer.listen( this.app.get('port'), callback(1));

    }
}