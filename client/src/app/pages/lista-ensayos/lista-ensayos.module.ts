import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaEnsayosPageRoutingModule } from './lista-ensayos-routing.module';

import { ListaEnsayosPage } from './lista-ensayos.page';
import { VacioDescripcionPipe } from '../../pipes/vacio-descripcion.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaEnsayosPageRoutingModule
  ],
  declarations: [ListaEnsayosPage, VacioDescripcionPipe]
})
export class ListaEnsayosPageModule {}
