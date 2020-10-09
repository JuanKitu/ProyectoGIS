import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../socket/socket';
//import {pausar} from '../controllers/ensayo.controllers'
import { arregloDM, EnsayoInterface } from '../interfaces/interfaces';
import { any } from 'bluebird';

//Aca habria que importar el archivos de sockets personalizado

export default class Server {
    private static _instance: Server;
    public app: express.Application;
    public io: socketIO.Server;
    private httpServer: http.Server;
    private arreglos:arregloDM;
    private ensayoActual:number;
    private pausado:boolean;
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
        this.arreglos={
            arregloMu:[],
            arregloDistancias:[]
        };
        this.ensayoActual = -1;
        this.pausado = false;
    }

    public static get instance(){
        return this._instance || ( this._instance = new this() );
    }
    public setearArray(unArray:arregloDM){
        this.arreglos=unArray;
    }
    public enUso(){
        return this.ensayoActual;
    }

    public setearEnsayo(unEnsayo:number){
        this.ensayoActual=unEnsayo;
    }
    
    public pausar(senial:boolean){
        this.pausado=senial;
    }

    public consultarPausa(){
       return this.pausado;
    }

    private escucharSockets() {

        console.log('escuchando conexiones - sockets');

        this.io.on('connection', client => {
            
            console.log('Cliente conectado');

            // Conectar cliente
            socket.conectarCliente( client, this.io);

            // Desconectar
            socket.desconectar( client,this.io);    
        
            //hola
            socket.decirHola(client,this.io);

            //mensaje
            socket.mensaje(client,this.io,this.arreglos);

            //En uso
            socket.consultaUso(client,this.io,this.ensayoActual)

            //pausar(client,this.io)
            socket.pausar(client,this.io,this.pausado)


            

        });

    }

    start( callback: Function, ip?:string ) {

        this.httpServer.listen( this.app.get('port'),ip, callback(1));

    }
}
