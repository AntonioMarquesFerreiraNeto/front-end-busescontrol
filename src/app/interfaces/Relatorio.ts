export interface Relatorio {
    valTotAprovados: number;
    valTotEmAnalise: number;
    valTotReprovados: number;
    valTotContratos: number;
    valTotPago: number;
    valTotPendente: number;
    valTotReceitas: number;
    valTotDespesas: number;
    valTotEfetuadoReceita: number;
    valTotEfetuadoDespesa: number;
    qtContratosAprovados: number;
    qtContratosEmAnalise: number;
    qtContratosNegados: number;
    qtContratos: number;
    qtClientesAdimplente: number;
    qtClientesInadimplente: number;
    qtClientesVinculados: number;
    qtClientes: number;
    qtMotorista: number;
    qtMotoristaVinculado: number;
    qtOnibus: number;
    qtOnibusVinculado: number;
    percentQtContratos: string;
    percentValorContratoAprovado: string;
    percentCliente: string;
    percentMotorista: string;
    percentOnibus: string;
}