import { Component, OnInit } from '@angular/core';

import { ClBodega } from '../../model/ClBodega';
import { BodegaService } from '../bodega-add/bodega.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-bodega-list',
  templateUrl: './bodega-list.page.html',
  styleUrls: ['./bodega-list.page.scss'],
})
export class BodegaListPage implements OnInit {
  bodegas: ClBodega[] = [];
  constructor(
    public restApi: BodegaService,
    public loadingController: LoadingController,
    private router:Router,
  ) { }

  ngOnInit() {
    this.getBodegas();
  }
  async getBodegas() {
    console.log("Entrando :getProducts");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Harrys Loading...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApi.getBodegas()
      .subscribe({
        next: (res) => { 
          console.log("Res:" + res);
  // Si funciona asigno el resultado al arreglo productos
          this.bodegas = res;
          console.log("thisProductos:",this.bodegas);
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
  // Si da error, imprimo en consola.
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }

}
