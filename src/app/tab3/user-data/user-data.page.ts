import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { NavController } from '@ionic/angular';
import { AlertController, LoadingController } from '@ionic/angular';
import { DetalleServiceService } from 'src/app/detalle-venta.service';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.page.html',
  styleUrls: ['./user-data.page.scss'],
})
export class UserDataPage implements OnInit {
  registroCompra: any[] = [];
  constructor(
    public user: LoginServiceService,
    private restApi: DetalleServiceService,
    private loadingController:LoadingController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getVentas();
    this.user.verificarRol(2, this.user.usuario.role, this.user.sesion);
  }

  async getVentas() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.restApi.getDetalles()
      .subscribe({
        next: (res) => { 
          //.filter(detalle_venta => detalle_venta.idUser == this.user.usuario.id)
          this.registroCompra = res;
          console.log(this.registroCompra);
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }
  logout() {
    alert("Has cerrado sesion");
    this.navCtrl.navigateRoot('/tabs/tab1');
    try {
      this.user.sesion = false;
      this.user.usuario = {
        id: 0
        , username: ''
        , password: ''
        , avatar: ''
        , role: 0
      };
    } catch {
      console.error("Ha ocurrido un error los sentimos");
    }
  }
}
