import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { EnsayoService } from '../../../../services/ensayo.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements OnInit {
  private idEnsayo:string;
  private realTime:boolean;
  constructor(private activeRoute:ActivatedRoute, private ensayoService:EnsayoService,  private menuController:MenuController) { }

  ngOnInit() {
    this.menuController.enable(false, "first")
    this.activeRoute.params.subscribe(params=>{
      this.idEnsayo = params['idEnsayo'];
      if(!(this.idEnsayo  == "#") ){
        this.realTime = false
      }else{
        this.realTime = true
      }

    });

  }

}
