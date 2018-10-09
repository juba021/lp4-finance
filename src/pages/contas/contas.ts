import { ContasAddPage } from './../contas-add/contas-add';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contas',
  templateUrl: 'contas.html',
})
export class ContasPage {

  public listContas = [
    {
      id: 1,
      descricao: "Alimentacao"
    },
    {
      id: 2,
      descricao: "Salario"
    },
    {
      id: 3,
      descricao: "Saude"
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContasPage');
  }
  
  public toContasAdd() {
    this.navCtrl.push(ContasAddPage);
  }
}
