import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleCompraPage } from './detalle-compra.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleCompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleCompraPageRoutingModule {}
