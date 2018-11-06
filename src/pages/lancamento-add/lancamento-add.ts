import { LancamentosDaoProvider } from './../../providers/lancamentos-dao/lancamentos-dao';
import { ContasDaoProvider } from './../../providers/contas-dao/contas-dao';
import { Conta } from './../../class/contas';
import { Lancamento } from './../../class/lancamentos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the LancamentoAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lancamento-add',
  templateUrl: 'lancamento-add.html',
})
export class LancamentoAddPage {

  public lancamento: Lancamento;
  public contas: any[] = [];
  public yearList: Number[] = [];
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public daoLancamentos: LancamentosDaoProvider,
              public daoContas: ContasDaoProvider,
              public alertCtrl: AlertController) {
    this.lancamento = new Lancamento();
    let data = new Date();
    this.lancamento.MES = data.getMonth();
    this.lancamento.ANO = data.getFullYear();
    this.lancamento.TIPO = 'C';
    
  }

  ionViewDidLoad() {
    this.getContas();
    this.setYearList();
    console.log('ionViewDidLoad LancamentoAddPage');
  }

  public setYearList() {
    for (let index = this.lancamento.ANO-5; index < this.lancamento.ANO+10; index++) {
      this.yearList.push(index);      
    }
  }

  public getContas() {
    this.daoContas.getList().then((data:any) => {
      this.contas = data;
    }).catch(e => console.error(e));
  }

  salvar() {
          this.daoLancamentos.inserir(this.lancamento);
          this.navCtrl.pop();
  }

  

}
