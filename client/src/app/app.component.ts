import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Observable } from 'rxjs';
import { Componente } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { WebSocketService } from './services/web-socket.service';
import { UsuarioService } from './services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  appPages: Observable<Componente[]>;
  darkMode:boolean = false;
  idEnsayo:number|unknown = -1;
  enUso:boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService:DataService,
    private webSocket:WebSocketService,
    private usuarioService:UsuarioService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.appPages = this.dataService.getMenuOpciones();
      
      this.webSocket.listen('respuestaUso').subscribe( data=>{
        console.log('se recibio la peticion de idEnsayo: ', data);
        this.idEnsayo = data;
      });

    });
  }
  darkModeChange(){
    this.darkMode = !this.darkMode;
 
      document.body.classList.toggle('dark');

  };

  logout(){
    this.usuarioService.logout();
  };
}
