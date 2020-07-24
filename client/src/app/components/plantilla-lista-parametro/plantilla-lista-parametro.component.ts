import { Component, OnInit, Input } from '@angular/core';
import { Parametro } from '../../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plantilla-lista-parametro',
  templateUrl: './plantilla-lista-parametro.component.html',
  styleUrls: ['./plantilla-lista-parametro.component.scss'],
})
export class PlantillaListaParametroComponent implements OnInit {
  @Input() parametros: Parametro[];
  @Input() archivado: boolean;
  titulo:string="Lista de Parametros";
  constructor(private router:Router) { }

  ngOnInit() {}

  seleccionarParametro(parametro:Parametro){
    if(!this.archivado){
      this.router.navigate(['/ensayo','lista','info',parametro.idEnsayo,'parametros',parametro.idParametro]);
    }else{
      this.router.navigate(['/ensayo','archivados','info',parametro.idEnsayo,'parametros',parametro.idParametro]);
    };
  }

}
