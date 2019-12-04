import { ClienteService } from './../../services/domain/cliente.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response;
          this.getImageIfExixts();
        },
        error => { //Forbidden falha de autenticação (403)
          if (error.status == 403){
            this.navCtrl.setRoot('HomePage');//O erro é tratado no interceptor mas a página é redirecionada na controller
          }
        });
    }else {//Não acha o localUser, página precisa de autenticação, então ele é redirecionado
      //Controller é responsável pelo redirecionamento (navegação)
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageIfExixts(){
   this.clienteService.getImagemFormBucket(this.cliente.id).subscribe(
     response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
     },
     error => {}
   );



  }

}
