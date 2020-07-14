import { Component, OnInit } from '@angular/core';
import { Ensayo } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { EnsayoArchivadoService } from '../../services/ensayo-archivado.service';

@Component({
  selector: 'app-ensayo',
  templateUrl: './ensayo.page.html',
  styleUrls: ['./ensayo.page.scss'],
})
export class EnsayoPage implements OnInit {
  titulo:string="Info ensayo";
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
  constructor(private activeRoute:ActivatedRoute, private ensayoArchivadoService:EnsayoArchivadoService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params=>{
      this.ensayo.idEnsayo=params['idEnsayo'];
    });
    if(this.ensayo.idEnsayo){
      this.ensayoArchivadoService.getOne(this.ensayo.idEnsayo).subscribe(data=>{
        this.ensayo=data['data'];
        //console.log(this.ensayo);
      });
    };
  }

}
