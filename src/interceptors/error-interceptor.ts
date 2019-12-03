import { Observable } from 'rxjs/Rx';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from '@angular/core';

// Classe para interceptar requisições na API
// Discussão: Ele deve redirecionar, mas quem cuida de navegação é a controller, ela redirecionando
// querba a arquiteura em camadas, oq fazer? Deixar aberto para q a controller possa agir em cima
// dos erros
//handle.catch

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {//implemente classe httpInterceptor

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {//Diz oq deverá ser feito
    console.log('Interceptor');
    return next.handle(req)//Continua a requisição
    .catch((error, caught)=>{

      let errorObj = error;
      if (errorObj.error){//Verifica se tem o objeto error dentro
        errorObj = errorObj.error;
      }

      if(!errorObj.status){//verifica se é um JSON
        errorObj = JSON.parse(errorObj);
      }

      console.log('Ero detectado pelo interceptor');
      console.log(errorObj);

      return Observable.throw(errorObj);//Se erro porpaga o erro, não lida com ele 100%
    }) as any;
  }
}

export const ErrorInterceptorProvider = {//Declara como esse interceptor será instanciado
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
}
