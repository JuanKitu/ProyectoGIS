import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { WebSocketService } from '../../services/web-socket.service';
import { EnsayoService } from '../../services/ensayo.service';

@Component({
  selector: 'app-controles-ensayo',
  templateUrl: './controles-ensayo.component.html',
  styleUrls: ['./controles-ensayo.component.scss'],
})
export class ControlesEnsayoComponent implements OnInit {
  pausa:boolean=false;
  idEnsayo:number | unknown;
  constructor(private alertController:AlertController, private webSocket:WebSocketService, private ensayoService:EnsayoService) { }

  ngOnInit() {
    this.webSocket.emit('consultarUso');
    this.webSocket.listen('respuestaUso').subscribe(data=>{
         this.idEnsayo = data; 
        console.log(this.idEnsayo)
    });
  }
pausarEnsayo(){
  //this.webSocket.emit('PAUSAR');
  this.ensayoService.pausarEnsayo().subscribe();
  this.pausa=!this.pausa;
};
reanudarEnsayo(){
  //this.webSocket.emit('REANUDAR');
  this.ensayoService.reanudarEnsayo().subscribe();
  this.pausa=!this.pausa;
};
  async cancelarEnsayo(){
    const alert = await this.alertController.create({
      header:'ATENCION',
      //subHeader:'Segundo Mensaje',
      message:'¿Esta seguro de cancelar el ensayo?',
      buttons:[
        {
          text: 'Aceptar',
          role: 'accept',
          cssClass: 'secundary',
          handler: (blah) => {
            //logica del aceptar
            console.log('Parando Ensayo');
            this.ensayoService.cancelarEnsayo().subscribe();
            //this.ensayoService.desconectarPuerto().subscribe();
          }
        },
        {
          text: 'Cancelar',
          role: 'destructive',
          cssClass: 'rojo',
          handler: (blah) => {
            //logica del cancelar
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();

  }

}
