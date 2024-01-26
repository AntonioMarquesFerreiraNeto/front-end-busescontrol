import { ClienteFisico } from "./ClienteFisico";
import { ClienteJuridico } from "./ClienteJuridico";
import { Contrato } from "./Contrato";
import { Fornecedor } from "./Fornecedor";
import { Parcela } from "./Parcela";

export interface Financeiro{
    id?: number;
    contrato?: Contrato;
    contratoId?: number;
    pessoaFisica?: ClienteFisico;
    pessoaJuridica?: ClienteJuridico;
    pessoaJuridicaId?: number;
    pessoaFisicaId?: number;
    fornecedor?: Fornecedor;
    fornecedorId?: number;
    dataVencimento: string;
    dataEmissao: string;
    qtParcelas: number;
    valorParcelaDR?: number;
    valorTotDR: number;
    valorTotalPago?: number;
    valorTotTaxaJurosPaga?: number;
    typeEfetuacao: number;
    despesaReceita: number;
    pagament?: number;
    parcelas?: Parcela[];
    detalhamento?: string;
    financeiroStatus?: number;
}