import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credencias.dto';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

  jwtHelper : JwtHelper = new JwtHelper();

  //jwtHelper : JwtHelper = new JwtHelper() novo
  //jwtHelper : JwtHelper = { params } novo preenchido
   //jwtHelper : JwtHelper ; vazio

  constructor(
    public http: HttpClient,
    public storage: StorageService) {

  }

  authenticate(credenciais: CredenciaisDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      credenciais,
      {//infos adicionais
        observe: 'response', // Pegar o Header da resposta, rentão identifica q o retornor é um response
        responseType: 'text' //Endpoint retorna vazio no corpo, text pra n tentar parsear para json
      })
  }

  successfulLogin(authorizationValue: string) {//Tratar e armazenar usuário no local Storage
    let token_ = authorizationValue.substring(7);//Remover Bearer do token
    let user: LocalUser = {
      token: token_,
      email: this.jwtHelper.decodeToken(token_).sub//sub pega o email do token
    }
    this.storage.setLocalUser(user);//Serviço reponsável por armazenar localUser no storage
  }

  logout() {//remove usuario do LocalStorage
    this.storage.setLocalUser(null);
  }

  refreshToken() {//Atualizar o Token
    //Interceptor já coloca o header c  token
    return this.http.post(
      `${API_CONFIG.baseUrl}/auth/refresh_token`,
      {},
      {//infos adicionais
        observe: 'response', // Pegar o Header da resposta, rentão identifica q o retornor é um response
        responseType: 'text' //Endpoint retorna vazio no corpo, text pra n tentar parsear para json
      })
  }

}

