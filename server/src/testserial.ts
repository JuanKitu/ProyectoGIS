import SerialPort from "serialport";
import { any, resolve } from "bluebird";
let puertosDisponibles: any[] = [];
let elPuertoOcupado: number = -1;
let elPuertoPar: number = -2;

function listarPuertos() {
  const laPromesa = new Promise((resolve) => {
    SerialPort.list().then(
      puertos => {
        puertos.forEach(puerto => {

          const elPuerto: SerialPort = new SerialPort(puerto.path, {
            autoOpen: false
          });
          elPuerto.open(function (err) {
            if (err) {
              return resolve(elPuertoOcupado = parseFloat(puerto.path.substring(3)));
            }
          })
        })
      }
    )
  })
  return laPromesa;

}

function comprobarPar(elPuerto: number) {

  const ruta: string = 'COM';
  const puertoAterior: number = elPuerto - 1;
  const puertoSiguiente: number = elPuerto + 1;
  const rutaPuertoAnterior: string = ruta.concat(puertoAterior.toString())
  const rutaPuertoSiguiente: string = ruta.concat(puertoSiguiente.toString())
  console.log(rutaPuertoAnterior);
  console.log(rutaPuertoSiguiente);
  const elPuertoAterior: SerialPort = new SerialPort(rutaPuertoAnterior, {
    autoOpen: false
  });
  const elPuertoSiguiente: SerialPort = new SerialPort(rutaPuertoSiguiente, {
    autoOpen: false
  });

  if (elPuertoAterior.isOpen === true) {
    elPuertoAterior.open();
    console.log('ABRIENDO');
  } else {
    console.log('YA ESTABA ABIERTO');
    elPuertoAterior.on('data', function (data) {
      console.log('Data:', data)
    })
  }
  /* elPuertoAterior.open(function (err) {
    if (err) {
      return console.log('Error opening port: ', err.message);
    }
  }); */

}


listarPuertos().then(data => {
  if (typeof (data) === "number") {
    console.log(data);
    comprobarPar(data);
  }

});