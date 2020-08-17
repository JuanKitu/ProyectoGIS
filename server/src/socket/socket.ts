import { Socket } from "socket.io";
import SerialPort = require('serialport');


export const desconectar = ( client: Socket) => {
    client.on('diconnect', () => {
        console.log('Cliente desconectado')
    });
}

export const conectarCliente = (client: Socket) => {
    client.on('connect', () => {
        console.log('Cliente conectado')
    });
}

const port = new SerialPort('COM4', {
    baudRate: 9600
  });

port.on('open', () => console.log('Puerto abierto'));

//Listening message from client
export const recibirStrem = (client: Socket) => {
    client.on('recibirStream', () => {
        port.on('readable', () => {
            const dato = port.read();
            if(dato){
               let informacion = parseFloat(dato.toString().substring(8) );
               client.emit('arduino:data', {
                   value: parseFloat(dato.toString().substring(8) )
               })
               
            }
        }) ;
    });
}

