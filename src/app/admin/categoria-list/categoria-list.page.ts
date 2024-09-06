import { Component, OnInit } from '@angular/core';


import { ClCategoria } from '../../model/ClCategoria';
import { CategoriaServiceService } from '../categoria-add/categoria-service.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.page.html',
  styleUrls: ['./categoria-list.page.scss'],
})
export class CategoriaListPage implements OnInit {
  categoriass: ClCategoria[] = [];
  constructor(
    private dataService: DataService,
    public restApi: CategoriaServiceService,
    public loadingController: LoadingController,
    private router:Router,
  ) { }

  ngOnInit() {
    this.getCategorias();
  }

  async getCategorias() {
    console.log("Entrando :getProducts");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Harrys Loading...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApi.getCategorias()
      .subscribe({
        next: (res) => { 
          console.log("Res:" + res);
  // Si funciona asigno el resultado al arreglo productos
          this.categoriass = res;
          console.log("thisProductos:",this.categoriass);
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
