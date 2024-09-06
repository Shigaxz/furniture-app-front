import { Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';

import { ClBodega } from '../../model/ClBodega';
import { BodegaService } from './bodega.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-bodega-add',
  templateUrl: './bodega-add.page.html',
  styleUrls: ['./bodega-add.page.scss'],
})
export class BodegaAddPage implements OnInit {
  bodegaForm!: FormGroup;
  bodega: ClBodega = {
    id: 0
    , direccion: ''
    , comuna: ''
    , region: ''
    , telefono: 0
  };

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: BodegaService,
    private router: Router,
    ) { }

    ngOnInit() {
      this.bodegaForm = this.formBuilder.group({
        "bod_dir": [null, Validators.required],
        "bod_com": [null, Validators.required],
        "bod_reg": [null, Validators.required],
        "bod_tel": [null, Validators.required],
      });
    }

    async onFormSubmit(form: NgForm) {
      console.log("onFormSubmit del bodega ADD")
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
  
      await this.restApi.addBodega(this.bodega)
        .subscribe({
          next: (res) => {
            console.log("Next addBodega Page",res)
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
            console.log("Error addBodega Página",err);
            loading.dismiss();
          }
        });
      console.log("Observe que todo lo del suscribe sale después de este mensaje")
    }

}
