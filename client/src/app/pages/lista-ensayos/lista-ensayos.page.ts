import { Component, OnInit } from '@angular/core';
import { EnsayoService } from '../../services/ensayo.service';
import { Ensayo } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-lista-ensayos',
  templateUrl: './lista-ensayos.page.html',
  styleUrls: ['./lista-ensayos.page.scss'],
})
export class ListaEnsayosPage implements OnInit {
  ensayos:Ensayo[];
  titulo:string="Lista de Ensayos";

  constructor(private ensayoService:EnsayoService) {
   };

  ngOnInit() {
    this.ensayoService.getAll().subscribe(data=>{
      this.ensayos=data['data'];
    });
  };
 
  doRefresh(event) {
    setTimeout(() => {
      this.ensayoService.getAll().subscribe(data=>{
        this.ensayos=data['data'];
      });
      event.target.complete();
    }, 1500);
  }
}
