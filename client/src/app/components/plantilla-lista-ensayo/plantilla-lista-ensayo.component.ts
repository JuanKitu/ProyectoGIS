import { Component, OnInit, Input } from '@angular/core';
import { EnsayoService } from '../../services/ensayo.service';
import { Ensayo } from '../../interfaces/interfaces';

@Component({
  selector: 'app-plantilla-lista-ensayo',
  templateUrl: './plantilla-lista-ensayo.component.html',
  styleUrls: ['./plantilla-lista-ensayo.component.scss'],
})
export class PlantillaListaEnsayoComponent implements OnInit {
  @Input() ensayos: Ensayo[];
  titulo:string="Lista de Ensayos";

  constructor(private ensayoService:EnsayoService) {
    
    
   };

  ngOnInit() {};

 
  doRefresh(event) {
    setTimeout(() => {
      this.ensayoService.getAll().subscribe(data=>{
        this.ensayos=data['data'];
      });
      event.target.complete();
    }, 1500);
  }


}