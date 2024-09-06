import { Component,OnInit} from '@angular/core';
import { DataService } from '../data.service';
import { NgModule } from '@angular/core';

import { ClProducto } from '../model/ClProducto';
import { ProductServiceService } from '../product-service.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  productForm!: FormGroup;
  product: ClProducto = {
    id: 0
    , nombre: ''
    , descripcion: ''
    , precio: 0
    , img: ''
    , stock: 0
  };

                   
  constructor(private formBuilder: FormBuilder,
    // Injectamos las librerías necesarias
    private loadingController: LoadingController,
    private restApi: ProductServiceService,
    private router: Router,
  ) { }

  // Antes que inicie en pantalla
  // especificamos las validaciones, 
  //    por medio de formBuilder injectado en el constructor
  ngOnInit() {
    // Especificamos que todos los campos son obligatorios
    this.productForm = this.formBuilder.group({
      "prod_name": [null, Validators.required],
      'prod_desc': [null, Validators.required],
      'prod_price': [null, Validators.required],
      'prod_img': [null, Validators.required]
    });
  }
  // se ejecutará cuando presione el Submit
  async onFormSubmit(form: NgForm) {
    console.log("onFormSubmit del Product ADD")
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    await this.restApi.addProduct(this.product)
      .subscribe({
        next: (res) => {
          console.log("Next AddProduct Page",res)
          loading.dismiss();
          if (res== null){
            console.log("Next No Agrego, Ress Null ");
            return
          }
          // Si viene respuesta
          console.log("Next Agrego SIIIIII Router saltaré ;",this.router);
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Error AddProduct Página",err);
          loading.dismiss();
        }
      });
    console.log("Observe que todo lo del suscribe sale después de este mensaje")
  }

}
