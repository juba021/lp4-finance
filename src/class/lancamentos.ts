import { Conta } from './contas';


export class Lancamento {
  ID: number;
  DESCRICAO: string;
  VALOR: number;
  REFERENCIA_MES: number;
  REFERENCIA_ANO: number;
  CONTA: Conta;
  TIPO: string;
  PAGO: string;
}