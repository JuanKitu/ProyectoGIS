import { Socket } from "socket.io";
import Server from '../classes/server';
import { arregloDM } from "../interfaces/interfaces";

export const desconectar = ( client: Socket,io: SocketIO.Server) => {
    client.on('diconnect', () => {
        console.log('Cliente desconectado')
    });
}

export const conectarCliente = (client: Socket,io: SocketIO.Server) => {
    client.on('connect', () => {
        console.log('Cliente conectado')
    });
}

export const decirHola = (client: Socket,io:SocketIO.Server)=>{
    client.emit('hola','Hola soy el servidor');
}

export const mensaje = ( cliente: Socket, io:SocketIO.Server, arreglos:arregloDM ) => {

    cliente.on('arrayPuntos', () => {
        if(arreglos.arregloDistancias.length !=0 && arreglos.arregloMu.length != 0){
            io.emit('envioArray',arreglos);
        }

    });

}

export const consultaUso = (cliente: Socket,io:SocketIO.Server,enUso:number)=>{
    cliente.on('consultarUso',()=>{
        console.log('CONSULTANDO DESDE EL CLIENTE');
        io.emit('respuestaUso',enUso);
    })
}

export const enviarAmbiente = (cliente: Socket,io:SocketIO.Server,ambiente:any)=>{
    cliente.on('getAmbiente',()=>{
        console.log('ENVIANDO DESDE SERVER');
        io.emit('ambiente',ambiente);
    })
}

//Pausando
export const pausar = (cliente: Socket,io:SocketIO.Server,pausado:boolean)=>{
    cliente.on('PAUSAR',()=>{
        console.log('¡¡¡¡¡PAUSANDO!!!!!');
        pausado=true;
    })
}
