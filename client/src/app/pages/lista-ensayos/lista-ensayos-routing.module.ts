import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEnsayosPage } from './lista-ensayos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEnsayosPage
  },
  {
    path: 'info/:idEnsayo',
    loadChildren: () => import('./ensayo.module').then( m => m.EnsayoPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaEnsayosPageRoutingModule {}
