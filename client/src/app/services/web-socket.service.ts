import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private socket:Socket, router:Router) { 
    console.log("Client socket on!");
  }

  emit( event: string, payload?: any, callback?: Function ) {

    console.log('Emitiendo', event);
    // emit('EVENTO', payload, callback?)
    this.socket.emit( event, payload, callback );

  };

  listen( event: string ) {
    return this.socket.fromEvent( event );
  };

}
