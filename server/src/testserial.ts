import SerialPort from "serialport";
let puertosDisponibles:any[]=[];


function listarPuertos(){

  SerialPort.list().then(
    puertos=>{
      puertos.forEach(puerto=>{
        const elPuerto:SerialPort = new SerialPort(puerto.path,{
          autoOpen:false
        });
        elPuerto.open(function (err) {
          if (err) {
            return elPuerto;
          }
        })
      })
    }
  )
}




listarPuertos();