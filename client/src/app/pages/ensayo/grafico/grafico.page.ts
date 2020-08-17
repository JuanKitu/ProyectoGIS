import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnsayoService } from '../../../services/ensayo.service';
import { Ensayo } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements OnInit {
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
  };
  titulo:string = "Grafico Ensayo";
  constructor(private activeRoute:ActivatedRoute, private ensayoService:EnsayoService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params=>{
      this.ensayo.idEnsayo=params['idEnsayo'];
    });
    if(this.ensayo.idEnsayo){
      this.ensayoService.getOne(this.ensayo.idEnsayo).subscribe(data=>{
        this.ensayo=data['data'];
        //console.log(this.ensayo);
      });
    };
  }

}
