import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParametrosArchivadosPageRoutingModule } from './parametros-archivados-routing.module';

import { ParametrosArchivadosPage } from './parametros-archivados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParametrosArchivadosPageRoutingModule
  ],
  declarations: [ParametrosArchivadosPage]
})
export class ParametrosArchivadosPageModule {}
