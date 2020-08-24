import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  titulo:string="Home";

  constructor(private webSocket:WebSocketService) { }

  ngOnInit() {
    console.log("en el home")
    this.webSocket.emit('consultarUso');
    this.webSocket.listen('respuestaUso').subscribe(data=>{
      console.log("El id del server es: ", data);
    })
  }

}
