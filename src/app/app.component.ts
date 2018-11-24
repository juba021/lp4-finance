import { HomePage } from './../pages/home/home';
import { DatabaseProvider } from './../providers/database/database';
import { ContasPage } from './../pages/contas/contas';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public home;
  public contas;
  
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dbProvider: DatabaseProvider) {
    this.home = HomePage;
    this.contas = ContasPage;
    
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      dbProvider.createDatabase();
    });

    
  }

  openPage(page) {
    this.rootPage = page;
  }
}
