import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { ClUsuario } from '../../model/ClUsuario';
import { LoginServiceService } from '../login-service.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuarioForm!: FormGroup;
  usuario: ClUsuario = {
    id: 0
    , username: ''
    , password: ''
    , avatar: ''
  };

  constructor(private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: LoginServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      "user_name": [null, Validators.required],
      'user_pass': [null, Validators.required],
      'user_avatar': [null, Validators.required]
    });
  }

  async onFormSubmit(form: NgForm) {
    console.log("onFormSubmit del Usuario ADD")
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    await this.restApi.addUsuario(this.usuario)
      .subscribe({
        next: (res) => {
          console.log("Next addUsuario Page",res)
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
          console.log("Error addUsuario Página",err);
          loading.dismiss();
        }
      });
    console.log("Observe que todo lo del suscribe sale después de este mensaje")
  }

}
