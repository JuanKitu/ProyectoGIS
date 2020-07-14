import { Component, OnInit } from '@angular/core';
import { Ensayo } from '../../interfaces/interfaces';
import { EnsayoArchivadoService } from '../../services/ensayo-archivado.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ensayos-archivados',
  templateUrl: './ensayos-archivados.page.html',
  styleUrls: ['./ensayos-archivados.page.scss'],
})
export class EnsayosArchivadosPage implements OnInit {

  titulo:string="Ensayos Archivados";
  ensayos:Ensayo[];
  constructor(private ensayoArchivadoService:EnsayoArchivadoService, private route:ActivatedRoute) { }

  ngOnInit() {
    //El route.paramMar es primordial para que la lista se vuelva a actualizar cada vez que se va a la componente hija
    this.route.paramMap.subscribe(()=>{
      this.ensayoArchivadoService.getAll().subscribe(data=>{
        this.ensayos=data['data'];
      });
    });
  }
  doRefresh(event) {
  }
}
