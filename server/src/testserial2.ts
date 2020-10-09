import SerialPort from "serialport";
import { EnsayoInterface, AmbienteInterface, objetoDatos, port } from "./interfaces/interfaces";
import Ensayo from "./models/Ensayo";
import Ambiente from "./models/Ambiente";
import moment from "moment";
import { Observable, Subscription } from "rxjs";
const elPuerto: SerialPort = new SerialPort(port.puertoControlador, {
   //autoOpen:false
})

elPuerto.write('<STAR,5,500>\n');

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