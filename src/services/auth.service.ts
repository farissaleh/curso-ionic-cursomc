import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credencias.dto';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {


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
      email: ""
    }
    this.storage.setLocalUser(user);//Serviço reponsável por armazenar localUser no storage
  }

  logout() {//remove usuario do LocalStorage
    this.storage.setLocalUser(null);
  }
}
