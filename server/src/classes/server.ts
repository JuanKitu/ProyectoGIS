import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../socket/socket';
//import {pausar} from '../controllers/ensayo.controllers'
import { arregloDM, EnsayoInterface, port } from '../interfaces/interfaces';
import { any } from 'bluebird';
import { fork } from 'child_process';
import SerialPort from 'serialport';

//Aca habria que importar el archivos de sockets personalizado

let portControlador = new SerialPort(port.puertoControlador, {
    autoOpen: false,
    baudRate: 9600,
});

export default class Server {
    private static _instance: Server;
    public app: express.Application;
    public io: socketIO.Server;
    private httpServer: http.Server;
    private arreglos: arregloDM;
    private ambiente: any;
    private ensayoActual: number;
    private pausado: boolean;
    private conectado: boolean;
    private procesando: boolean;
    private constructor() {
        this.app = express();
        //settings
        this.app.set('port', 3000);
        this.app.set('json spaces', 2);
        //configurando el socket
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        //Conectando a la maquina
        //this.conectar();
        //escuchando propiedades del socket
        this.escucharSockets();
        this.arreglos = {
            arregloMu: [],
            arregloDistancias: []
        };

        this.ensayoActual = -1;
        this.pausado = false;
        this.conectado = false;
        this.procesando = false;
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
    public setearArray(unArray: arregloDM) {
        this.arreglos = unArray;
    }
    public enUso() {
        return this.ensayoActual;
    }

    public setearEnsayo(unEnsayo: number) {
        this.ensayoActual = unEnsayo;
    }

    public pausar(senial: boolean) {
        this.pausado = senial;
    }

    public consultarPausa() {
        return this.pausado;
    }

    public consultarConectado() {
        return this.conectado;
    }

    public setearConexion(estado: boolean) {
        this.conectado = estado;
    }

    public consultarAmbiente() {
        return this.ambiente;
    }

    public setearAmbiente(newAmbiente: any) {
        this.ambiente = newAmbiente;
    }

    public consultarProcesando() {
        return this.procesando;
    }

    public setearProcesando(estado: boolean) {
        this.procesando = estado;
    }

    public conectar() {
        console.log('CONECTAR DEL SERVER');
        const childConn = fork('../server/dist/serialport/conectar.js', ['normal']);
        childConn.on('message', (MP: number) => {
            //portControlador.close();
            this.setearConexion(true);
            console.log(this.consultarConectado());
            if (this.consultarConectado()) {
                childConn.kill();
            }
        })
    }

    private escucharSockets() {

        console.log('escuchando conexiones - sockets');

        this.io.on('connection', client => {

            console.log('Cliente conectado');
            if(!this.consultarConectado()){
                this.conectar();
            }
            

            // Conectar cliente
            socket.conectarCliente(client, this.io);

            // Desconectar
            socket.desconectar(client, this.io);
            
            client.on('arrayPuntos', () => {
                if(this.arreglos.arregloDistancias.length !=0 && this.arreglos.arregloMu.length != 0){
                    this.io.emit('envioArray',this.arreglos);
                }
            });
            
            client.on('consultarUso',()=>{
                console.log('CONSULTANDO DESDE EL CLIENTE');
                this.io.emit('respuestaUso',this.ensayoActual);
            })


            //Ambiente
            //socket.enviarAmbiente(client, this.io, this.ambiente)
            client.on('getAmbiente',()=>{
                console.log('ENVIANDO DESDE SERVER');
                this.io.emit('ambiente',this.ambiente);
            })

        });

    }


    start(callback: Function, ip?: string) {

        this.httpServer.listen(this.app.get('port'), ip, callback(1));

    }
}
