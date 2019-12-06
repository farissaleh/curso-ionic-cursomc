import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ClienteDTO } from '../../models/cliente.dto';

@Injectable()
export class ClienteService {

  constructor(
    public http: HttpClient,
    public storage : StorageService) {

  }

  findByEmail(email : string): Observable<ClienteDTO> {
    // let token = this.storage.getLocalUser().token;
    // let header = new HttpHeaders({'Authorization':'Bearer '+ token});//enviar token na req

    // return this.http.get<ClienteDTO>(
    //   `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
    //   {'headers': header});

    return this.http.get<ClienteDTO>(
      `${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
  }

  getImagemFormBucket(id : string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    return this.http.get(url, {responseType : 'blob'})//seta o retorno como blob para n ter erro de parser
  }

  insert(obj: ClienteDTO){
    return this.http.post(`${API_CONFIG.baseUrl}/clientes`,
    obj,
    {// API n retornará nada no corpo então evita-se erro de parser p json
      observe: 'response',
      responseType: 'text'
    });

  }
}
