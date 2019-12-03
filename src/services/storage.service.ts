import { STORAGE_KEYS } from './../config/storages_keys.config';
import { LocalUser } from './../models/local_user';
import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {
  //Seta,remove e recupera infos no localStorage
  getLocalUser() : LocalUser {
    let user = localStorage.getItem(STORAGE_KEYS.localUser);
    if (user == null) {
      return null;
    }
    else{
        return JSON.parse(user);//Converter a String para o objeto com parser
    }
  }

  setLocalUser(user : LocalUser) {
    if (user == null) {
        localStorage.removeItem(STORAGE_KEYS.localUser);
    }else{//Armazena a classe convertida em String no localStorage
      localStorage.setItem(STORAGE_KEYS.localUser,JSON.stringify(user));//Transformando em String para armazenar no local Storage
    }
  }
}
