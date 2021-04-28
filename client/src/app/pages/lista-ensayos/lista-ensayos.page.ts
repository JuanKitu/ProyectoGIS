import { Component, OnInit } from '@angular/core';
import { EnsayoService } from '../../services/ensayo.service';
import { Ensayo } from 'src/app/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-ensayos',
  templateUrl: './lista-ensayos.page.html',
  styleUrls: ['./lista-ensayos.page.scss'],
})
export class ListaEnsayosPage implements OnInit {
  ensayos: Ensayo[];
  titulo:string="Lista de Ensayos";

  constructor(private ensayoService:EnsayoService, private route:ActivatedRoute) {
    
    
   };

  ngOnInit() {
    this.ensayoService.getSiniestro().subscribe(data=>{
      console.log("probando de otro cliente: ", data['data'])
    })
    //El route.paramMar es primordial para que la lista se vuelva a actualizar cada vez que se va a la componente hija
    this.route.paramMap.subscribe(()=>{
      this.ensayoService.getAll().subscribe(data=>{
        this.ensayos=data['data'];
      });
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
