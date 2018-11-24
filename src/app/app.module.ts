import { DatabaseProvider } from './../providers/database/database';
import { ContasDaoProvider } from './../providers/contas-dao/contas-dao';
import { LancamentosDaoProvider } from './../providers/lancamentos-dao/lancamentos-dao';
import { LancamentoAddPageModule } from './../pages/lancamento-add/lancamento-add.module';
import { ContasAddPageModule } from './../pages/contas-add/contas-add.module';
import { ContasPageModule } from './../pages/contas/contas.module';
import { IntroPageModule } from './../pages/intro/intro.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';



@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IntroPageModule,
    ContasPageModule,
    ContasAddPageModule,
    LancamentoAddPageModule,    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    ContasDaoProvider,
    LancamentosDaoProvider
  ],
})
export class AppModule {}
