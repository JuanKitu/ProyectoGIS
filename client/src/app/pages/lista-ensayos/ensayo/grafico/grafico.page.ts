import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ArrayPuntos } from '../../../../interfaces/interfaces';
import { EnsayoService } from '../../../../services/ensayo.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements OnInit {
  private idEnsayo:number;
  private arrayGrafico:ArrayPuntos;
  constructor(private activeRoute:ActivatedRoute, private ensayoService:EnsayoService,  private menuController:MenuController) { }

  ngOnInit() {
    this.menuController.enable(false, "first")
    this.activeRoute.params.subscribe(params=>{
      this.idEnsayo = params['idEnsayo'];
    });

  }

}
