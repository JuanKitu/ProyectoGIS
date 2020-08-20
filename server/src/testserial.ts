const SerialPort = require('serialport');
import Parametros from '../src/models/Parametros';
import {ParametroInterface} from '../src/interfaces/interfaces'
import Server from './classes/server';
import { fork } from 'child_process';

/*
const server = Server.instance;
setInterval(hacerPrueba,5000)

let i:number = 0;
function hacerPrueba(){
  console.log(i)
  server.io.emit('prueba',i)
  i++;
}
*/

const server = Server.instance;
const hijoPrueba = fork('testChildProcess.js');
hijoPrueba.send({server:server});
hijoPrueba.on('message',(FIN:any)=>{
  console.log(FIN);
  hijoPrueba.kill();
})