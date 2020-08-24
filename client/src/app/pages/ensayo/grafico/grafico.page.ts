import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnsayoService } from '../../../services/ensayo.service';
import { Ensayo } from 'src/app/interfaces/interfaces';
import { WebSocketService } from '../../../services/web-socket.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements OnInit {
  idEnsayo:number|unknown=-1;
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
    idEnsayo:-1
  };
  titulo:string = "Grafico Ensayo";
  constructor(private ensayoService:EnsayoService, private webSocket:WebSocketService) { }

  ngOnInit() {
    this.webSocket.emit('consultarUso');
    this.webSocket.listen('respuestaUso').subscribe( data=>{
         this.idEnsayo =  data; 
    });
    if(this.idEnsayo){
      this.ensayoService.getOne(this.ensayo.idEnsayo).subscribe(data=>{
        this.ensayo=data['data'];
        //console.log(this.ensayo);
      });
    };
  }

}
