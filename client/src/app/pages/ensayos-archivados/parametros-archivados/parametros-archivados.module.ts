import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParametrosArchivadosPageRoutingModule } from './parametros-archivados-routing.module';

import { ParametrosArchivadosPage } from './parametros-archivados.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParametrosArchivadosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ParametrosArchivadosPage]
})
export class ParametrosArchivadosPageModule {}
