import { Conta } from './../../class/contas';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../database/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InstanceProperty } from '@ionic-native/core';

/*
  Generated class for the ContasDaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContasDaoProvider {

  constructor(public dbProvider: DatabaseProvider) { }

  public getList() {
    return this.dbProvider.getDB()
                          .then((db: SQLiteObject) => {
                            let sql = "SELECT * FROM CONTAS";

                            return db.executeSql(sql, [])
                                     .then((data: any) => {
                                      if (data.rows.length > 0) {
                                        let contas: any[] = [];
                                        for (let i = 0; i < data.rows.length; i++) {
                                          contas.push(data.rows.item(i));
                                          
                                        }
                                        return contas;
                                      } else {
                                        return [];
                                      }
                                     })
                                     .catch((e) => console.error("Erro ao executar sql", e)
                                     )
                          })
                          .catch((e) => console.error("Erro ao consultar", e));
  }

  public get(id) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        return db.executeSql("SELECT * FROM CONTAS WHERE (ID) = ?", [id])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let conta = new Conta();
              conta.ID = item.ID;
              conta.DESCRICAO = item.DESCRICAO;
              return conta; 
            }
            return null;
          })
          .catch(e => console.error(e));
      })
      .catch(e => console.error(e));
  }

  public insert(conta) {
    return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          return db.executeSql("INSERT INTO CONTAS (DESCRICAO) VALUES (?)", [conta.DESCRICAO])
            .catch(e => console.error(e));
          })
          .catch(e => console.error(e));
        
  }

  public update(conta) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      return db.executeSql("UPDATE CONTAS SET (DESCRICAO) = (?) WHERE ID = (?)", [conta.DESCRICAO, conta.ID])
        .catch(e => console.error(e));
    })
    .catch(e => console.error(e));
  }

  public delete(id) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        return db.executeSql("DELETE FROM CONTAS WHERE ID = ?", [id]).catch(e => console.error())
      })
      .catch(e => console.error(e)
      );
  }

}
