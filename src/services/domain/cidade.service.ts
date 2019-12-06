import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';//importação correta
import { CidadeDTO } from '../../models/cidadeDTO';

@Injectable()
export class CidadeService {

  constructor(public http :HttpClient){
  }

  findAll(estado_id: string) : Observable<CidadeDTO[]>{ //Descrição de retorno do método
    return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);//` crase permite colocar variáveis
  }
}
