import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleCompraPageRoutingModule } from './detalle-compra-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalleCompraPage } from './detalle-compra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DetalleCompraPageRoutingModule
  ],
  declarations: [DetalleCompraPage]
})
export class DetalleCompraPageModule {}
