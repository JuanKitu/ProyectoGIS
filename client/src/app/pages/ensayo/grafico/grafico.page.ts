import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnsayoService } from '../../../services/ensayo.service';
import { Ensayo } from 'src/app/interfaces/interfaces';
import { WebSocketService } from '../../../services/web-socket.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements OnInit {
  plataformasEscritorio= new Set(['tablet','desktop','ipad']);
  plataformaActual:Set<string>;
  ocultar:boolean;
  idEnsayo:number| unknown;
  titulo:string = "Grafico Ensayo";
  constructor(private ensayoService:EnsayoService, private webSocket:WebSocketService, private platform:Platform, private router:Router) { }

  ngOnInit() {
    //el getCurrentNavigation es para pedir el id desde la otra pagina, muy importante
 /*    console.log("")
    if(this.router.getCurrentNavigation().extras.state.idEnsayo != undefined){
      this.idEnsayo = this.router.getCurrentNavigation().extras.state.idEnsayo;
    }else{
      this.webSocket.emit('consultarUso');
      this.webSocket.listen('respuestaUso').subscribe(data=>{
          this.idEnsayo = data;   
      })
    } */
    this.plataformaActual = new Set(this.platform.platforms());
    const intersection = new Set(Array.from(this.plataformasEscritorio).filter(x => this.plataformaActual.has(x)));
    console.log(this.platform.platforms())
    if(intersection.size == 0){
      this.ocultar=true;
    }else{
      this.ocultar=false
    }
    this.webSocket.getUsuarios().subscribe(data=>{
    })
  }

}
