import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(public sqlite: SQLite) { }

  // cria ou abre um banco de dados sqlite 
  getDB() {
    return this.sqlite.create({
      name: 'lp4-finance3',
      location: 'default'
    });
  }

  // cria estrutura inicial do BD
  createDatabase() {
    return this.getDB()
               .then((db: SQLiteObject) => {
                  // cria tabelas
                  this.createTables(db);
                  // Insert dos dados iniciais
                  this.insertsDefault(db);
               })
               .catch()
  }

  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS CONTAS (ID INTEGER PRIMARY KEY AUTOINCREMENT, DESCRICAO TEXT) '],
      ['CREATE TABLE IF NOT EXISTS LANCAMENTOS (ID INTEGER PRIMARY KEY AUTOINCREMENT, DESCRICAO TEXT, VALOR REAL, MES INTEGER, ANO INTEGER, TIPO, TEXT, PAGO TEXT, CONTA_ID, INTEGER, CONSTRAINT FK_CONTAS FOREIGN KEY (CONTA_ID) REFERENCES CONTAS (ID))']
    ])
      .then(() => console.log("tabelas criadas com sucesso"))
      .catch((e) => console.error("Erro ao criar as tabelas", e))
  }

  private insertsDefault(db: SQLiteObject) {
    db.executeSql('SELECT COUNT(ID) AS QNTD FROM CONTAS', <any>{})
      .then((data) => {
        if (data.rows.item(0).QNTD === 0) {
          db.sqlBatch([
            ['INSERT INTO CONTAS (DESCRICAO) VALUES (?)', ['Alimentação'] ],
            ['INSERT INTO CONTAS (DESCRICAO) VALUES (?)', ['Saude'] ],
            ['INSERT INTO CONTAS (DESCRICAO) VALUES (?)', ['Transporte'] ],
          ])
          .then(() => console.log("Inserts de contas realizado com sucesso"))
          .catch((e) => console.error("Erro ao inserir contas padrao", e));
        }
      })
      .catch((e) => console.error("Erro ao consultar contas", e));
  }
}
