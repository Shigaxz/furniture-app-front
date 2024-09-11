import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginServiceService } from '../tab3/login-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public api: LoginServiceService,
    private navCtrl: NavController
  ) {}

  admin(){
    this.navCtrl.navigateRoot('/admin-page');
  }

  user(){
    this.navCtrl.navigateRoot('/user-data');
  }
}
