import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credencias.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()//Indica que essa classe é um página e pode se referências entere aspas 'pagina'
//Permite usar a classe pelo nome sem import para o lazy load
@Component({//Decorator que permite que classe seja um controlador
  selector: 'page-home',//nome atribuido
  templateUrl: 'home.html'//Referênicas ao qual arquivo essa class controla
})
export class HomePage {

  credenciais: CredenciaisDTO = {//Será feito um bind com html e por isso tem q começar vazio
    email: "",
    senha: ""
  }

  //Ionic e Angular para injetar uma intancia de objeto em uma classe
  // basta decarar essse objeto como parámetro do construtor
  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService) {//Injeção de Dependencia

  }
  ionViewWillEnter() {
    this.menu.swipeEnable(false)
    // this.auth.logout();//toda vez que a home for carregada será limpada os dados do usuário do storage
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true)
  }

  ionViewDidEnter() {//Quando entrar na tela, vai executar o refres token
    //se tudo der certo no endpoint ele Loga e passa p próxima página
    this.auth.refreshToken().subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage')
    },
    error => {});
  }

  login() {//sem nda entende-se q o método é público
    //Todo elemente de uma classe tem q ser precedidio pela palavra this
    //localStorage (HTML 5), armazenamento local, meio de pares (chave, vaor) string set/get/remove Item
    this.auth.authenticate(this.credenciais)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        // this.navCtrl.push('CategoriasPage') // Empilha uma página em cima da outra, fila de páginas
        this.navCtrl.setRoot('CategoriasPage') // não empilha
      }, error => { });
  }

}
