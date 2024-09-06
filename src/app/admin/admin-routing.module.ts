import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'categoria-add',
    loadChildren: () => import('./categoria-add/categoria-add.module').then( m => m.CategoriaAddPageModule)
  },
  {
    path: 'bodega-add',
    loadChildren: () => import('./bodega-add/bodega-add.module').then( m => m.BodegaAddPageModule)
  },
  {
    path: 'categoria-list',
    loadChildren: () => import('./categoria-list/categoria-list.module').then( m => m.CategoriaListPageModule)
  },
  {
    path: 'bodega-list',
    loadChildren: () => import('./bodega-list/bodega-list.module').then( m => m.BodegaListPageModule)
  },
  {
    path: 'detalle-compra',
    loadChildren: () => import('./detalle-compra/detalle-compra.module').then( m => m.DetalleCompraPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
