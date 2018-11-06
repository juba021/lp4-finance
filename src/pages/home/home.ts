import { LancamentosDaoProvider } from './../../providers/lancamentos-dao/lancamentos-dao';
import { LancamentoAddPage } from './../lancamento-add/lancamento-add';
import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public listLancCred:any[] = [];
  public listLancDeb:any[] = [];
  public mes: number = 0;
  public ano: number = 0;
  public month: String = "";

  constructor(public navCtrl: NavController,
              public daoLancamento: LancamentosDaoProvider,
              public alertCtrl: AlertController,
              public toast: ToastController) {

    let date = new Date();
    this.mes = date.getMonth();
    this.ano = date.getFullYear();

  }

  ionViewDidEnter() {
    this.getListCred();
    this.getListDeb();
    this.getMes(this.mes);
  }

  getListCred() {
    this.daoLancamento.getList('C', this.mes, this.ano)
                      .then((result: any[]) => {
                        console.log(result);
                        this.listLancCred = result;
                      });
  }

  getListDeb() {
    this.daoLancamento.getList('D', this.mes, this.ano)
                      .then((result: any[]) => {
                        console.log(result);
                        this.listLancDeb = result;
                      });
  }

  getMes(month) {
    switch (month) {
      case 0:
        this.month = "Janeiro";
        break;
      case 1:
        this.month = "Fevereiro";
        break;
      case 2:
        this.month = "Março";
        break;
      case 3:
        this.month = "Abril";
        break;
      case 4:
        this.month = "Maio";
        break;
      case 5:
        this.month = "Junho";
        break;
      case 6:
        this.month = "Julho";
        break;
      case 7:
        this.month = "Agosto";
        break;
      case 8:
        this.month = "Setembro";
        break;
      case 9:
        this.month = "Outubro";
        break;
      case 10:
        this.month = "Novembro";
        break;
      case 11:
        this.month = "Dezembro";
        break;
    
      default:
        this.month = "";
        break;
    }
  }

  delete(id) {
    this.alertCtrl.create({
      title: 'Atenção',
      message: 'Você deseja realmente excluir este registro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.daoLancamento.delete(id).then(() => {
              this.toast.create({
                message: "Registro deletado!",
                duration: 1500,
                position: 'botton'
              }).present();
              this.ionViewDidEnter();
            });
          }
        }
      ]
    }).present();
  }
  public toLancamentoAdd() {
    this.navCtrl.push(LancamentoAddPage);
  }
}
