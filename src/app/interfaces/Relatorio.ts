import { SimpleAnalytics } from "./SimpleAnalytics";

export interface Relatorio {
    valTotAprovados: number;
    valTotEmAnalise: number;
    valTotReprovados: number;
    valTotContratos: number;
    valTotPago: number;
    valTotPendente: number;
    valTotReceitas: number;
    valTotDespesas: number;
    valorJurosAndMultas: number;
    valorReceitasComuns: number;
    valTotEfetuadoReceita: number;
    valTotEfetuadoDespesa: number;
    qtContratosEncerrados: number;
    qtContratosAprovados: number;
    qtContratosEmAnalise: number;
    qtContratosNegados: number;
    qtContratos: number;
    qtClientesAdimplente: number;
    qtClientesInadimplente: number;
    qtClientesVinculados: number;
    qtClientes: number;
    percentQtContratos: string;
    percentValorContratoAprovado: string;
    percentCliente: string;
    simpleAnalytics: SimpleAnalytics[];
}