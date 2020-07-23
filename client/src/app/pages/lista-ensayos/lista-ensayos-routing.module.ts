import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEnsayosPage } from './lista-ensayos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEnsayosPage
  },
  //se tiene que vincular a mano la lista de parametros
  {
    path: 'lista-parametros',
    loadChildren: () => import('./lista-parametros/lista-parametros.module').then( m => m.ListaParametrosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaEnsayosPageRoutingModule {}
