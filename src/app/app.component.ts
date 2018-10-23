import { DatabaseProvider } from './../providers/database/database';
import { ContasPage } from './../pages/contas/contas';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public home;
  public contas;
  
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dbProvider: DatabaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //dbProvider.createDatabase();
    });

    this.home = HomePage;
    this.contas = ContasPage;
  }

  openPage(page) {
    this.rootPage = page;
  }
}
