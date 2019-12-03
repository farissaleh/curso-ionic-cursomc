import { CategoriaDTO } from './../../models/categoria.dto';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';//importação correta

@Injectable() // Para q essa classe possa ser injetada em outras classes
export class CategoriaService {
  //Classe será um provider onde uma intancia p toda aplicação
  //Se for usar em amis de um apágina registrar no modulo principal
  //Senão no modulo q irá usar

  constructor(public http :HttpClient){
  }

  findAll() : Observable<CategoriaDTO[]>{ //Descrição de retorno do método
    return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);//` crase permite colocar variáveis
    //em strings sem ter q concatenar com +; usar ${} para variáveis
  }

  //Get tipado
  //get<CategoriaDTO[]> // Indica q o request retornará esse objeto

  //Requisições HTPP no angular são assíncornas, chamadas ajax,
  //então deve-se inscrever p receber a resposta de requisição
  //Usar Observable para isso, ele encapsula essa lógica
}
