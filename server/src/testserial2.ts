import SerialPort from "serialport";
import { EnsayoInterface, AmbienteInterface, objetoDatos, port } from "./interfaces/interfaces";
import Ensayo from "./models/Ensayo";
import Ambiente from "./models/Ambiente";
import moment from "moment";
import { Observable, Subscription } from "rxjs";
const elPuerto: SerialPort = new SerialPort(port.puertoCelda, {
   //autoOpen:false
})

elPuerto.write('<DCON>\n');
elPuerto.on('data', (data) => {
   console.log(data.toString());
})
/* let i: number = 0;
const obserbableFuerza = new Observable(subscriber => {

   console.log(i);
   if (i != 9) {
      subscriber.next(i);
   } else {
      subscriber.complete();
   }

})

const youtube: Subscription = obserbableFuerza.subscribe(data => {
   console.log(typeof(data));
   i++;
   
}) */