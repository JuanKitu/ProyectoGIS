import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io'
import { Router } from '@angular/router';
import { Parametro, urlServices } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socketURL:string = `${urlServices}socket`;
  constructor(private socket:Socket, private router:Router, private httpClient:HttpClient) { 
    console.log("Client socket on!");
  }

  emit( event: string, payload?: any, callback?: Function ) {
    // emit('EVENTO', payload, callback?)
    this.socket.emit( event, payload, callback );

  };

  listen( event: string ){
     return  this.socket.fromEvent( event );
  };
  getUsuarios(){
    return this.httpClient.get(`${this.socketURL}/usuarios`);
  }
}
