import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Parametro } from '../../../../interfaces/interfaces';
import { EnsayoService } from '../../../../services/ensayo.service';


@Component({
  selector: 'app-lista-parametros',
  templateUrl: './lista-parametros.page.html',
  styleUrls: ['./lista-parametros.page.scss'],
})
export class ListaParametrosPage implements OnInit {
  titulo:string = "Lista de parametros";
  idEnsayo:number;
  parametros:Parametro[]
  constructor(private activeRoute:ActivatedRoute, private ensayoService:EnsayoService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params=>{
      this.idEnsayo=params['idEnsayo'];
    });
    if(this.idEnsayo){
      //El activeRoute.paramMar es primordial para que la lista se vuelva a actualizar cada vez que se va a la componente hija
      this.activeRoute.paramMap.subscribe(()=>{
        this.ensayoService.getAllParametro(this.idEnsayo).subscribe(data=>{
          this.parametros=data['data'];
          console.log("hola: ",this.parametros);
        });
      });
    };
  }

}
