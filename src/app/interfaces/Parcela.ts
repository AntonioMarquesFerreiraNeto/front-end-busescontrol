import { Financeiro } from "./Financeiro";

export interface Parcela{
    id?: number;
    financeiro?: Financeiro;
    financeiroId?: number;
    nomeParcela: string;
    valorJuros?: number;
    dataVencimentoParcela: string; 
    dataEfetuacao?: string;
    statusPagamento?: number;
}