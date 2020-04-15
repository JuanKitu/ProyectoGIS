import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaEnsayosPageRoutingModule } from './lista-ensayos-routing.module';

import { ListaEnsayosPage } from './lista-ensayos.page';
import { VacioDescripcionPipe } from '../../pipes/vacio-descripcion.pipe';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaEnsayosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListaEnsayosPage, VacioDescripcionPipe]
})
export class ListaEnsayosPageModule {}
