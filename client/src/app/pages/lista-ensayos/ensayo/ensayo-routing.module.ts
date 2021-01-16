import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnsayoPage } from './ensayo.page';

const routes: Routes = [
  {
    path: '',
    component: EnsayoPage
  },
  //se tiene que vincular a mano la lista de parametros
  {
    path: 'parametros',
    loadChildren: () => import('./lista-parametros/lista-parametros.module').then( m => m.ListaParametrosPageModule)
  },
  {
    path: 'grafico',
    loadChildren: () => import('./grafico/grafico.module').then( m => m.GraficoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnsayoPageRoutingModule {}
