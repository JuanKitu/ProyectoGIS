import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficoEmergentePageRoutingModule } from './grafico-emergente-routing.module';

import { GraficoEmergentePage } from './grafico-emergente.page';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficoEmergentePageRoutingModule,
    ComponentsModule
  ],
  declarations: [GraficoEmergentePage]
})
export class GraficoEmergentePageModule {}
