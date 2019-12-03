import { AuthService } from './../../services/auth.service';
import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core';
import { HomePage } from './home';

@NgModule({
  declarations: [HomePage],//componentes ou páginas que fazem parte do módulo
  imports: [IonicPageModule.forChild(HomePage)]//nome deve ser igual a controladora
})
export class HomeModule{
}
