import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaParametrosPageRoutingModule } from './lista-parametros-routing.module';

import { ListaParametrosPage } from './lista-parametros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaParametrosPageRoutingModule
  ],
  declarations: [ListaParametrosPage]
})
export class ListaParametrosPageModule {}
