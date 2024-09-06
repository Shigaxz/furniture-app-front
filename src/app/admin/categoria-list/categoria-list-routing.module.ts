import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaListPage } from './categoria-list.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaListPageRoutingModule {}
