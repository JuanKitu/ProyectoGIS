import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Parametro } from '../../../../../interfaces/interfaces';
import { EnsayoService } from '../../../../../services/ensayo.service';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.page.html',
  styleUrls: ['./parametro.page.scss'],
})
export class ParametroPage implements OnInit {
  titulo:string = "Parametro"
  parametro:Parametro={
    fuerzaRozamiento:null,
    coeficienteRozamiento:null,
    vueltas:null,
    tiempoActual:null
  };
  constructor(private activeRoute:ActivatedRoute, private ensayoService:EnsayoService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params=>{
      this.parametro.idEnsayo=params['idEnsayo'];
      this.parametro.idParametro=params['idParametro'];
    });
    if(this.parametro.idEnsayo && this.parametro.idParametro ){
      this.ensayoService.getOneParametro(this.parametro.idEnsayo, this.parametro.idParametro).subscribe(data=>{
        this.parametro=data['data'];
        console.log(this.parametro);
      });
    };
  }

}
