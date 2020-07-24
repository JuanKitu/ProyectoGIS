import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnsayosArchivadosPage } from './ensayos-archivados.page';

const routes: Routes = [
  {
    path: '',
    component: EnsayosArchivadosPage
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
export class EnsayosArchivadosPageRoutingModule {}
