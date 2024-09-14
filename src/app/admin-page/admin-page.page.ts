import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginServiceService } from '../tab3/login-service.service';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit {
  tasks:any[]=[]
  constructor(
    private navCtrl: NavController,
    private user: LoginServiceService) { }

  ngOnInit() {
    this.user.verificarRol(1, this.user.usuario.role, this.user.sesion);
  }

  crearProducto(){
    this.navCtrl.navigateRoot('/admin');
  }

  crearCategoria(){
    this.navCtrl.navigateRoot('/admin-cat');
  }

  crearBodega(){
    this.navCtrl.navigateRoot('/admin-bod');
  }
  listarCategoria(){
    this.navCtrl.navigateRoot('/admin-cat-list');
  }

  listarBodega(){
    this.navCtrl.navigateRoot('/admin-bod-list');
  }

  agregarDetalleC(){
    this.navCtrl.navigateRoot('/admin-detc');
  }
  volverHome(){
    this.navCtrl.navigateRoot('/tabs/tab1');
  }
  
}
