import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage.service';
import { Observable } from 'rxjs/Rx';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {//Diz oq deverá ser feito
    let localUser = this.storage.getLocalUser();


    // let requesToApi = req.url.includes (API_CONFIG.baseUrl);
    //verficar se é req é para API
    let N = API_CONFIG.baseUrl.length;
    let requesToApi = req.url.substring(0,N) == API_CONFIG.baseUrl;

    if (localUser && requesToApi) {//se esxiter adicionará no header
      //cabeçalho só serve para a API java
      const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localUser.token) });
      //Clonamos a requisição adicionando o token no header
      //Tem que clonar por request e responses tem caracteristivas de imutabilidade, para
      //o original não ser alterado por quem não deve
      return next.handle(authReq)
    }else {
      return next.handle(req)//Continua a requisição
    }

  }
}

//Provaider da classe de interceptor
export const AuthInterceptorProvider = {//Declara como esse interceptor será instanciado
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
}
