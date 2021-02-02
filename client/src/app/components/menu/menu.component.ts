import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable, Subscriber } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';
import { WebSocketService } from '../../services/web-socket.service';
import { MenuController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  appPages: Observable<Componente[]>;
  darkMode:boolean = false;
  idEnsayo:number|unknown = -1;
  
  constructor(private dataService:DataService, private webSocket:WebSocketService, private usuarioService:UsuarioService) {
      
     }

  ngOnInit() {
    
    this.appPages = this.dataService.getMenuOpciones();
    this.webSocket.emit('consultarUso');
    this.webSocket.listen('respuestaUso').subscribe(async data=>{
         this.idEnsayo = await data; 
        console.log(this.idEnsayo)
    });
  }
  darkModeChange(){
    this.darkMode = !this.darkMode;
    console.log(this.darkMode);

      document.body.classList.toggle('dark');
  }
  logout(){
    this.usuarioService.logout();
  };
}
