import { Component, OnInit } from '@angular/core';
import { Ensayo } from '../../interfaces/interfaces';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-ensayo',
  templateUrl: './ensayo.page.html',
  styleUrls: ['./ensayo.page.scss'],
})
export class EnsayoPage implements OnInit {
  titulo:string="Nuevo Ensayo";
  ensayo:Ensayo={
    operador:"",
    distanciaTotal:null,
    radioTrayectoria:null,
    materialBola:"",
    carga:null,
    diametroBola:null,
    codigoProbeta:"",
    durezaProbeta:null,
    tratamientoProbeta:"",
    materialProbeta:"",
    observaciones:"",
    idDato:null,
    tiempoTotal:null

  };

  constructor(private webSocket:WebSocketService) {}

  ngOnInit() {
    this.webSocket.listen('prueba2').subscribe(data=>{
      console.log("Esto es algo basico de los socket ", data);
    });
    this.webSocket.emit('respuesta',{hola:'Hola soy el cliente'});
  }
}
