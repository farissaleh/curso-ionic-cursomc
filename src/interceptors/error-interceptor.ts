import { FieldMessage } from './../models/fieldmessage';
import { StorageService } from './../services/storage.service';
import { Observable } from 'rxjs/Rx';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

// Classe para interceptar requisições na API
// Discussão: Ele deve redirecionar, mas quem cuida de navegação é a controller, ela redirecionando
// querba a arquiteura em camadas, oq fazer? Deixar aberto para q a controller possa agir em cima
// dos erros
//handle.catch

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {//implemente classe httpInterceptor

  constructor(
    public storage: StorageService,
    public alertCtrl: AlertController) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {//Diz oq deverá ser feito
    return next.handle(req)//Continua a requisição
      .catch((error, caught) => {

        let errorObj = error;
        if (errorObj.error) {//Verifica se tem o objeto error dentro
          errorObj = errorObj.error;
        }

        if (!errorObj.status) {//verifica se é um JSON
          errorObj = JSON.parse(errorObj);
        }

        console.log('Ero detectado pelo interceptor:');
        console.log(errorObj);

        //O erro é tratado no interceptor mas a página é redirecionada na controller
        switch (errorObj.status) {//Para tratar cada status de uma forma
          case 403:
            this.handle403();
            break;
          case 401:
            this.handle401();
            break;
          case 404:
            this.handle404();
            break;
          case 422:
            this.handle422(errorObj);
            break;
          default:
            this.handleDefaultError(errorObj);
        }

        return Observable.throw(errorObj);//Se erro porpaga o erro, não lida com ele 100%
      }) as any;
  }

  handle403() {//Forbidden, limpa o Local User pq ele está inválido?
    this.storage.setLocalUser(null);
  }

  handle401() {//Forbidden
    let alert = this.alertCtrl.create({//definir propriedade do alert
      title: 'Error 401: Falha de autenticação',
      message: 'Email ou senha incorretos',
      enableBackdropDismiss: false,//Não permite sair do alert clicando fora do alert
      buttons: [//lista de butões
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

  handle404() {//Not Found
    let alert = this.alertCtrl.create({//definir propriedade do alert
      title: 'Error 404: Recurso não encontrado',
      message: 'Não foi possível encontrar o recurso solicitado',
      enableBackdropDismiss: false,//Não permite sair do alert clicando fora do alert
      buttons: [//lista de butões
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

  handle422(errorObj) {//Entity n processada, error padrão da API
    let alert = this.alertCtrl.create({
      title: 'Erro de validação',
      message: this.listApiErrors(errorObj.errors),
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'ok'
        }
      ]
    });
    alert.present();
  }

  handleDefaultError(errorObj) {//Forbidden
    let alert = this.alertCtrl.create({//definir propriedade do alert
      title: `Erro ${errorObj.status}: ${errorObj.error}`,
      message: errorObj.message,
      enableBackdropDismiss: false,//Não permite sair do alert clicando fora do alert
      buttons: [//lista de butões
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

  //Concatena a lista de erro que vem do back
  listApiErrors(errors: FieldMessage[]){
    let texto: string = '';
    errors.forEach(error => {
      texto= texto + '<p><strong>'+ error.fieldName+ '</strong>: '+ error.message+'</p>';
    });
    return texto;
  }
}

export const ErrorInterceptorProvider = {//Declara como esse interceptor será instanciado
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
}
