import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { VacioDescripcionPipe } from './pipes/vacio-descripcion.pipe';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { urlSocket } from './interfaces/interfaces';
import { ChartsModule } from 'ng2-charts';
const config: SocketIoConfig = { url: urlSocket, options: {} };


@NgModule({
  declarations: [AppComponent, MenuComponent],
  entryComponents: [],
  exports:[MenuComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule, SocketIoModule.forRoot(config), ChartsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}