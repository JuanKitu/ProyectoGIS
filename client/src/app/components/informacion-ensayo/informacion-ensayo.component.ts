import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { DatosEnsayo } from '../../interfaces/interfaces';

@Component({
  selector: 'app-informacion-ensayo',
  templateUrl: './informacion-ensayo.component.html',
  styleUrls: ['./informacion-ensayo.component.scss'],
})
export class InformacionEnsayoComponent implements OnInit {
  ambiente:DatosEnsayo
  constructor(private webSocket:WebSocketService) { }
  ngOnInit() {
    if(!this.ambiente){
      this.ambiente={
        horaInicio:'---',
        horaFin:'---',
        velocidad:0,
        temperatura:0,
        humedad:0
      };
    };
    this.webSocket.emit('getAmbiente');
    this.webSocket.listen('ambiente').subscribe(data=>{
      console.log('RECIBIENDO AMBIENTE EN CLIENTE')
      this.ambiente=data;
    })

    /* this.webSocket.listen('velocidad').subscribe(data=>{
      console.log('LA VELOCIDAD 1: ',data);
      console.log('EL TIPO DE LA VELOCIDAD: ',typeof(data));
      if(typeof(data)=='number')
      this.ambiente.velocidad=data;
    }) */
  }

}
