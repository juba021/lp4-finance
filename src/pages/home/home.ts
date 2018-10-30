import { LancamentoAddPage } from './../lancamento-add/lancamento-add';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  public toLancamentoAdd() {
    this.navCtrl.push(LancamentoAddPage);
  }
}
