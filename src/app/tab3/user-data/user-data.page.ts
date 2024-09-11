import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.page.html',
  styleUrls: ['./user-data.page.scss'],
})
export class UserDataPage implements OnInit {

  constructor(
    public user: LoginServiceService,
    
  ) { }

  ngOnInit() {
  }

}
