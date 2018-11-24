import { SQLite } from '@ionic-native/sqlite';
import { Lancamento } from './../../class/lancamentos';
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
    console.log('Hello DaoLancamentoProvider Provider');
  }

  public getList(tipo) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
       return db.executeSql("SELECT L.*, C.DESCRICAO AS CONTA_DESCRICAO FROM LANCAMENTOS L LEFT JOIN CONTAS C ON C.ID = L.CONTA_ID WHERE TIPO = ?  ORDER BY L.DESCRICAO", [tipo])
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

  public get(id) {
    return this.dbProvider.getDB()
                  .then((db: SQLiteObject) => {
                    return db.executeSql('SELECT * FROM LANCAMENTOS WHERE ID = ?', [id])
                             .then((data: any) => {
                               console.log("Lancamento");
                               console.log(data);
                               if (data.rows.length > 0) {
                                 let item = data.rows.item(0);
                                 let lancamento = new Lancamento();
                                 lancamento.ID = item.ID;
                                 lancamento.DESCRICAO = item.DESCRICAO;
                                 lancamento.VALOR = item.VALOR;
                                 lancamento.MES = item.MES;
                                 lancamento.ANO = item.ANO;
                                 lancamento.CONTA = item.CONTA_ID;
                                 lancamento.TIPO = item.TIPO;
                                 lancamento.PAGO = item.PAGO;
                                 return lancamento;
                               }
                               return null;
                             })
                             .catch(e => console.error("Erro ao buscar lançamento", e));
                  })
                  .catch(e => console.error("Erro ao abrir banco", e));
  }

  public insert(lancamento) {
    return this.dbProvider.getDB()
               .then((db: SQLiteObject) => {
                  db.executeSql("INSERT INTO LANCAMENTOS (DESCRICAO, VALOR, MES, ANO, CONTA_ID, TIPO, PAGO) VALUES (?, ?, ?, ?, ?, ?, ?)", [lancamento.DESCRICAO, lancamento.VALOR, lancamento.MES, lancamento.ANO, lancamento.CONTA, lancamento.TIPO, lancamento.PAGO])
                    .catch(e => console.error(e));
               })
               .catch(e => console.error());
  }

  public update(lancamento) {
    return this.dbProvider.getDB()
               .then((db: SQLiteObject) => {
                  return db.executeSql("UPDATE LANCAMENTOS SET DESCRICAO = ?, VALOR = ?, MES = ?, ANO = ?, CONTA_ID = ?, TIPO = ?, PAGO = ? WHERE ID = ?", [lancamento.DESCRICAO, lancamento.VALOR, lancamento.MES, lancamento.ANO, lancamento.CONTA, lancamento.TIPO, lancamento.PAGO, lancamento.ID])
                            .catch(e => console.error("Erro ao atualizar lançamento", e));
               })
               .catch(e => console.error("Erro ao brir banco", e));
  }

  public delete(id) {
    return this.dbProvider.getDB()
               .then((db:SQLiteObject) => {
                 return db.executeSql("DELETE FROM LANCAMENTOS WHERE ID = ?", [id]).catch(e => console.error(e));
               })
               .catch(e => console.error(e));
  }

  public setPago(id) {
    return this.dbProvider.getDB()
               .then((db:SQLiteObject) => {
                 return db.executeSql("UPDATE LANCAMENTOS SET PAGO = 'true' WHERE ID = ?", [id]).catch(e => console.error(e));
               })
               .catch(e => console.error(e));
  }
}
