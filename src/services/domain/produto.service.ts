import { ProdutoDTO } from '../../models/produto.dto';
import { API_CONFIG } from '../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { EstadoDTO } from '../../models/estadoDTO';

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  findByCategroia(categoria_id: string): Observable<ProdutoDTO[]> {
    return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }
}
