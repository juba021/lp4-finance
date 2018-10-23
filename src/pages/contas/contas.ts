import { ContasDaoProvider } from './../../providers/contas-dao/contas-dao';
import { ContasAddPage } from './../contas-add/contas-add';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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

  public listContas: any[] = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
       public contasDao: ContasDaoProvider, public alertCtrl: AlertController) {
  }
  
  
  ionViewDidEnter() {
    this.getList();
    console.log('ionViewDidLoad ContasPage');
  }

  getList() {
    this.contasDao.getList()
                  .then((data: any[]) => {
                    this.listContas = data;
                  }).catch((e) => console.error("Nao conseguiu buscar", e));
  }
  
  public toContasAdd() {
    this.navCtrl.push(ContasAddPage);
  }

  delete(conta) {
    this.contasDao.delete(conta.ID)
      .then(() => {
        var index = this.listContas.indexOf(conta);
        this.listContas.splice(index, 1);
        
        const alert = this.alertCtrl.create({
          title: 'Deletado!',
          subTitle: 'Registro deletado com sucesso!',
          buttons: ['OK']
        });
        alert.present();
      });
  }

  toContasUpdate(id) {
    this.navCtrl.push(ContasAddPage, { "id":id });
  }

}
