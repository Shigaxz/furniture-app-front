import { Component,OnInit} from '@angular/core';

import { ClCategoria } from '../../model/ClCategoria';
import { CategoriaServiceService } from './categoria-service.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/tab3/login-service.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: CategoriaServiceService,
    private router: Router,
    private user: LoginServiceService) { }

  ngOnInit() {
    this.categoriaForm = this.formBuilder.group({
      "cat_name": [null, Validators.required]
    });
    this.user.verificarRol(1, this.user.usuario.role, this.user.sesion);
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
            console.log("Ress Null ");
            return
          }
          // Si viene respuesta
          console.log("Router;",this.router);
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Error addCategoria Página",err);
          loading.dismiss();
        }
      });
  }

}
