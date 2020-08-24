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
        io.emit('respuestaUso',enUso);
    })
}



//Listening message from client
/*
export const emitirStream = (client: Socket,io:SocketIO.Server,unEnsayo:Ensayo) => {
    client.on('recibirStream', (payload) => {
        io.emit('grafica',payload)
    });
}

*/