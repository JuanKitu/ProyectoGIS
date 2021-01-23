import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficoEmergentePage } from './grafico-emergente.page';

const routes: Routes = [
  {
    path: '',
    component: GraficoEmergentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficoEmergentePageRoutingModule {}
