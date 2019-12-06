import { ClienteService } from './../../services/domain/cliente.service';
import { EstadoDTO } from './../../models/estadoDTO';
import { EstadoService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeDTO } from '../../models/cidadeDTO';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;//grupo
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,//Injeções de outra página q estão no provider
    public estadoService: EstadoService,
    public clienteServie: ClienteService,
    public alertCtrl: AlertController) {

    //intanciar o FormGroup
    //Validações sintáticas (tamanho) e validações q n precisam de banco ficam no front
    this.formGroup = this.formBuilder.group({//Criar um formGroup
      //colocar msm nomes de atributos do html formControlName
      //Bind é feito em cima do formControlName
      //Tem q ter um bing no formulário
      nome: ['Faris', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],//Atributos: Valor + Validator
      email: ['faris@mail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['06597893107', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      logradouro: ['Rua Via', [Validators.required]],
      numero: ['25', [Validators.required]],
      complemento: ['Apt 3', []],
      bairro: ['Bairro', []],
      cep: ['72462564', [Validators.required]],
      telefone1: ['896848464', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]

    });
  }

  ionViewDidLoad() {
    this.getEstadosOnInit();
  }

  signupUser() {
    this.clienteServie.insert(this.formGroup.value).subscribe(response => {
      this.showInsertOk();
    },
      error => {

      });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          //fazer/lidar com algo após apertar o botão
          handler: () => {//()=> função q n recepe nenhum parámetro
            this.navCtrl.pop();//serve p desempilhar essa página
            //volta p págia anterior removendo essa da pilha
          }

        }
      ]
    });
    alert.present();
  }

  getEstadosOnInit() {
    this.estadoService.findAll().subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id)//Seta o valor do primeiro id da lista para o formcontrl
      this.updateCidades();
    },
      error => { });
  }

  //Controls é para alterar/controlar o atributo
  //P recuperar n precisa this.formGroup.value.estadoId
  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;//Pega o código do estado selecionado no HTML
    this.cidadeService.findAll(estado_id).subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);//Qnd for executa desseleciona o select de cidade
    },
      erro => { });
  }

}
