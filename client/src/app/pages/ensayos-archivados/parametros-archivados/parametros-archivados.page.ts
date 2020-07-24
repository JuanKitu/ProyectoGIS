import { Component, OnInit } from '@angular/core';
import { Parametro } from '../../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { EnsayoService } from '../../../services/ensayo.service';
import { EnsayoArchivadoService } from 'src/app/services/ensayo-archivado.service';

@Component({
  selector: 'app-parametros-archivados',
  templateUrl: './parametros-archivados.page.html',
  styleUrls: ['./parametros-archivados.page.scss'],
})
export class ParametrosArchivadosPage implements OnInit {
  titulo:string = " Lista de parametros archivados";
  idEnsayo:number;
  parametros:Parametro[]
  constructor(private activeRoute:ActivatedRoute, private ensayoArchivadoService:EnsayoArchivadoService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params=>{
      this.idEnsayo=params['idEnsayo'];
    });
    if(this.idEnsayo){
      this.ensayoArchivadoService.getAllParametro(this.idEnsayo).subscribe(data=>{
        this.parametros=data['data'];
        console.log("hola: ",this.parametros);
      });
    };
  }

}
