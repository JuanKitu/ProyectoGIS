import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnsayosArchivadosPageRoutingModule } from './ensayos-archivados-routing.module';

import { EnsayosArchivadosPage } from './ensayos-archivados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnsayosArchivadosPageRoutingModule
  ],
  declarations: [EnsayosArchivadosPage]
})
export class EnsayosArchivadosPageModule {}
