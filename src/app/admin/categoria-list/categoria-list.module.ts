import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaListPageRoutingModule } from './categoria-list-routing.module';

import { CategoriaListPage } from './categoria-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaListPageRoutingModule
  ],
  declarations: [CategoriaListPage]
})
export class CategoriaListPageModule {}
