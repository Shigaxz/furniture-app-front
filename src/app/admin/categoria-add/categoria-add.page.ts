import { Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';

import { ClCategoria } from '../../model/ClCategoria';
import { CategoriaServiceService } from './categoria-service.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria-add',
  templateUrl: './categoria-add.page.html',
  styleUrls: ['./categoria-add.page.scss'],
})
export class CategoriaAddPage implements OnInit {
  categoriaForm!: FormGroup;
  categoria: ClCategoria = {
    id: 0
    , nombre: ''
  };

  constructor(private formBuilder: FormBuilder,
    // Injectamos las librerías necesarias
    private loadingController: LoadingController,
    private restApi: CategoriaServiceService,
    private router: Router,) { }

  ngOnInit() {
    this.categoriaForm = this.formBuilder.group({
      "cat_name": [null, Validators.required]
    });
  }

  async onFormSubmit(form: NgForm) {
    console.log("onFormSubmit del categoria ADD")
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    await this.restApi.addCategoria(this.categoria)
      .subscribe({
        next: (res) => {
          console.log("Next addCategoria Page",res)
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
          console.log("Error addCategoria Página",err);
          loading.dismiss();
        }
      });
    console.log("Observe que todo lo del suscribe sale después de este mensaje")
  }

}
