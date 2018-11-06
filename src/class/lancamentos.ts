import { Conta } from "./contas";

export class Lancamento {
    ID: number;
    DESCRICAO: string;
    VALOR: number;
    MES: number;
    ANO: number;
    CONTA: Conta;
    TIPO: string;
    PAGO: boolean;
}