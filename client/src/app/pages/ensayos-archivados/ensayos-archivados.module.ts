import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnsayosArchivadosPageRoutingModule } from './ensayos-archivados-routing.module';

import { EnsayosArchivadosPage } from './ensayos-archivados.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnsayosArchivadosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EnsayosArchivadosPage]
})
export class EnsayosArchivadosPageModule {}
