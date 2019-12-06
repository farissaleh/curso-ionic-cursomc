import { CidadeService } from './../../services/domain/cidade.service';
import { EstadoService } from './../../services/domain/estado.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers: [
    EstadoService,//esses serviços vão ter um única instanica somente nesse modulo;
    //estão no escopo na página de signup
    CidadeService
  ]
})
export class SignupPageModule {}
