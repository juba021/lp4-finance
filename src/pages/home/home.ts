import { LancamentoAddPage } from './../lancamento-add/lancamento-add';
import { LancamentosDaoProvider } from './../../providers/lancamentos-dao/lancamentos-dao';
import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public listLancCred:any[] = [];
  public listLancDeb:any[] = [];
  public referencia_mes: number = 0;
  public referencia_ano: number = 0;
  public mes: string = '';
  public totalCred: number = 0;
  public totalDeb: number = 0;
  public saldo: number = 0;
  

  constructor(public navCtrl: NavController,
              public daoLancamento: LancamentosDaoProvider,
              public alertCtrl: AlertController,
              public toast: ToastController) {
    let date = new Date();
    this.referencia_mes = date.getMonth();
    this.referencia_ano = date.getFullYear();
  }

  ionViewDidEnter() {
    this.getListCred();
    this.getListDeb();
    this.getMes(this.referencia_mes);
    this.totals();
  }

  getListCred() {
    this.daoLancamento.getList('C')
                      .then((result: any[]) => {
                        console.log(result);
                        this.listLancCred = result;
                      });
  }

  getListDeb() {
    this.daoLancamento.getList('D')
                      .then((result: any[]) => {
                        console.log(result);
                        this.listLancDeb = result;
                      });
  }

  totals() {
    console.log(this.listLancCred);
    console.log(this.listLancDeb);
    
    for (let i = 0; i < this.listLancDeb.length; i++) {
      this.totalDeb += this.listLancDeb[i];
    } 

    
  }

  pago(id) {
    this.daoLancamento.setPago(id).then((result:any[]) => {
      console.log(result);
      this.toast.create({
        message: "Lançamento Pago!",
        duration: 1500,
        position: 'botton'
      }).present();
      this.ionViewDidEnter();
    });
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

  addLancamento() {
    this.navCtrl.push(LancamentoAddPage);
  }

  edit(id) {
    this.navCtrl.push(LancamentoAddPage, {"id":id});
  }

  getMes(mes) {
    switch (mes) {
      case 0:
        this.mes = "Janeiro";
        break;
      case 1:
        this.mes = "Fevereiro";
        break;
      case 2:
        this.mes = "Março";
        break;
      case 3:
        this.mes = "Abril";
        break;
      case 4:
        this.mes = "Maio";
        break;
      case 5:
        this.mes = "Junho";
        break;
      case 6:
        this.mes = "Julho";
        break;
      case 7:
        this.mes = "Agosto";
        break;
      case 8:
        this.mes = "Setembro";
        break;
      case 9:
        this.mes = "Outubro";
        break;
      case 10:
        this.mes = "Novembro";
        break;
      case 11:
        this.mes = "Dezembro";
        break;
    
      default:
        this.mes = "";
        break;
    }
  }
}