import { Component,OnInit} from '@angular/core';
import { DataService } from '../data.service';
import { NgModule } from '@angular/core';

import { ClProducto } from '../model/ClProducto';
import { ProductServiceService } from '../product-service.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoginServiceService } from '../tab3/login-service.service';

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

                   
  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: ProductServiceService,
    private router: Router,
    private user: LoginServiceService
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      "prod_name": [null, Validators.required],
      'prod_desc': [null, Validators.required],
      'prod_price': [null, Validators.required],
      'prod_img': [null, Validators.required]
    });
    this.user.verificarRol(1, this.user.usuario.role, this.user.sesion);
  }

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
            console.log("Ress Null ");
            return
          }
          console.log("Router;",this.router);
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Error AddProduct Página",err);
          loading.dismiss();
        }
      });
  }

}
