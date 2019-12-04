import { AuthService } from './../services/auth.service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';//Diz qual é a página inicial da aplicação

  pages: Array<{ title: string, component: string, iconName: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authService: AuthService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Home', component: 'HomePage' }
      { title: 'Profile', component: 'ProfilePage',iconName:'' },//Ionic page permite acesso pelo nome da classe
      { title: 'Categorias', component: 'CategoriasPage',iconName:'' },
      { title: 'Logout', component: 'HomePage', iconName:'exit'}//''
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: { title: string, component: string , iconName: string}) {

    if (page.title == 'Logout') {
      this.authService.logout();
    }
    this.nav.setRoot(page.component);
    // switch (page.title) {
    //   case 'Logout':
    //     this.authService.logout();
    //     this.nav.setRoot('HomePage');
    //     break;
    //   default:
    //     this.nav.setRoot(page.component);
    // }
  }
}
