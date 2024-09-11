import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginServiceService } from './login-service.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  FormularioL!: FormGroup;
  username: string = '';
  password: string = '';

  constructor(private navCtrl: NavController,
    private fb: FormBuilder,
    public loadingController: LoadingController,
    private usuarioService: LoginServiceService,
    private navControl: NavController,
    private cliente: HttpClient,
    ) {this.construirFormulario()}

    public construirFormulario(): void {
      this.FormularioL = this.fb.group({
      username:['',[Validators.required]],
      password: ['',[Validators.required]],
      })
    }

    iniciarSesion() {
      this.cliente.get<any>(this.usuarioService.apiUrl).subscribe(res => {
        const user = res.find((dato: any) => {
          return dato.username === this.FormularioL.value.username && dato.password === this.FormularioL.value.password
        })
        if (user) {
          if (user.role == 1) {
            alert("Usuario Admin reconocido");
            this.FormularioL.reset();
            this.navCtrl.navigateRoot('/admin-page');
            this.usuarioService.sesion = true;
            this.usuarioService.usuario = user;
          } else {
            alert("Usuario Cliente Logeado");
            this.FormularioL.reset();
            this.navControl.navigateRoot('');
            this.usuarioService.sesion = true;
            this.usuarioService.usuario = user;
          }
        } else {
          alert("Error al iniciar sesión!");
        }
      }, (error) => {
        alert("Error al iniciar sesión!");
      });
    }
    
}
