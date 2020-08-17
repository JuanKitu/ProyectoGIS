const SerialPort = require('serialport');
import Parametros from '../src/models/Parametros';
import {ParametroInterface} from '../src/interfaces/interfaces'

const portCelda = new SerialPort('COM5', {
  baudRate: 9600
})
const portControlador = new SerialPort('COM4', {
  baudRate: 9600
})
// Read data that is available but keep the stream in "paused mode"
const AllParametros = new Array;

async function  ParametrosPuerto(time:number){
  const tiempo = time + 0.4;
  const newParametro = await Parametros.create({
    idEnsayo:5,
    fuerzaRozamiento: (portCelda.on('readable', function () {parseFloat(portCelda.read().toString().substring(8))})),
    coeficienteRozamiento:( (portCelda.on('readable', function () {parseFloat(portCelda.read().toString().substring(8))})) * 9.8 ) / 8,
    vueltas: (portControlador.on('readable', function () {parseFloat(portControlador.read().toString())})),
    tiempoActual: tiempo
  });
  return tiempo
}
async function ParametrosArray(unParametro:ParametroInterface,arrayParametro:ParametroInterface[], time:number){
  unParametro.tiempoActual=time;
  return arrayParametro.push(unParametro);
}