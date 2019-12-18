import { API_CONFIG } from './../../config/api.config';
import { BucketService } from './../../services/bucket.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from '../../services/domain/produto.service';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  produtos : ProdutoDTO[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public produtosService : ProdutoService,
              public bucketService : BucketService) {
  }

  ionViewDidLoad() {
    let categroia_id = this.navParams.get('categoria_id');// para pegrar o parametro
    // passada pela navegação
    this.produtosService.findByCategroia(categroia_id)
      .subscribe(response => {//endpoint paginado
       this.produtos = response['content'];
       this.loadImageUrls();
    }, error => {});
  }

  loadImageUrls(){
    for (let index = 0; index < this.produtos.length; index++) {
      let prod = this.produtos[index];
      let path = `/prod${prod.id}-small.jpg`
      this.bucketService.findImage(path)
        .subscribe(response => {
          console.log("OK");
          prod.imageUrl = API_CONFIG.bucketBaseUrl+path;
      }, error => {});
    }
  }

}
