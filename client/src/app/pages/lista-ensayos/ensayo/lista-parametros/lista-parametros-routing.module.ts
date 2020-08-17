import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaParametrosPage } from './lista-parametros.page';

const routes: Routes = [
  {
    path: '',
    component: ListaParametrosPage
  },
  {
    path: ':idParametro',
    loadChildren: () => import('./parametro/parametro.module').then( m => m.ParametroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaParametrosPageRoutingModule {}
