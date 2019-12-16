import { API_CONFIG } from './../../config/api.config';
import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  items: CategoriaDTO[];//Coleção []
  bucketUrl: string = API_CONFIG.bucketBaseUrl;//Api de imagens do curso

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
    .subscribe(response => {//Deve-se increver para ter uma respsta
      //dentro desse subscrive deve ter uma função q será executada quando o método for executado
      //Função callback
      this.items = response;
      console.log(response);//Response é o objeto q é recebido da classe de serviço => List of Categorias

    },error => {}); //Pode decidir oq fazer em caso de erro pq o interceptor propaga o erro
  }

  showProdutos(){
    this.navCtrl.push('ProdutosPage');
  }

}
