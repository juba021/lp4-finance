import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../database/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LancamentosDaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LancamentosDaoProvider {

   
  constructor(public dbProvider: DatabaseProvider) {
    console.log('Hello LancamentosDaoProvider Provider');
  }

  inserir(lancamento) {
    return this.dbProvider.getDB()
               .then((db: SQLiteObject) => {
                  db.executeSql("INSERT INTO LANCAMENTOS (DESCRICAO, VALOR, MES, ANO, CONTA, TIPO, PAGO) VALUES (?, ?, ?, ?, ?, ?, ?)", [lancamento.DESCRICAO, lancamento.VALOR, lancamento.REFERENCIA_MES, lancamento.REFERENCIA_ANO, lancamento.CONTA, lancamento.TIPO, lancamento.PAGO])
                    .catch(e => console.error(e));
               })
               .catch(e => console.error());
  }


  getList(tipo, mes, ano) {
    return this.dbProvider.getDB()
               .then((db: SQLiteObject) => {
                  return db.executeSql("SELECT L.*, C.DESCRICAO AS CONTA_DESCRICAO FROM LANCAMENTOS L LEFT JOIN CONTAS C ON C.ID = L.CONTA_ID WHERE TIPO = ? AND L.REFERENCIA_MES = ? AND L.REFERENCIA_ANO = ? ORDER BY L.DESCRICAO", [tipo, mes, ano])
                           .then((data: any) => {
                             if (data.rows.length > 0) {
                               let lancamentos:any[] = [];
                               for (var i=0; i < data.rows.length; i++) {
                                 let lancamento = data.rows.item(i);
                                 lancamentos.push(lancamento);
                               }
                               return lancamentos;
                             }
                             return null;
                           })
                           .catch(e => console.error(e));
               })
               .catch(e => console.error());
  }

  delete(id) {
    return this.dbProvider.getDB()
               .then((db:SQLiteObject) => {
                 return db.executeSql("DELETE FROM LANCAMENTOS WHERE ID = ?", [id]).catch(e => console.error(e));
               })
               .catch(e => console.error(e));
  }
}
