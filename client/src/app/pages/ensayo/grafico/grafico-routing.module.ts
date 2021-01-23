import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficoPage } from './grafico.page';

const routes: Routes = [
  {
    path: '',
    component: GraficoPage
  },
  {
    path: 'full',
    loadChildren: () => import('./grafico-emergente/grafico-emergente.module').then( m => m.GraficoEmergentePageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficoPageRoutingModule {}
