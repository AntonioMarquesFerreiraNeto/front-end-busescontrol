import { ClientesContrato } from "./ClientesContrato";
import { Funcionario } from "./Funcionario";
import { Onibus } from "./Onibus";
import { SubContratoMotorista } from "./SubContratoMotorista";
import { SubContratoOnibus } from "./SubContratoOnibus";

export interface Contrato {
    id?: number;
    motoristaId?: number;
    onibusId?: number;
    valorMonetario: number;
    valorParcelaContrato?: number;
    valorTotalPagoContrato?: number;
    valorParcelaContratoPorCliente?: number;
    dataEmissao: string;
    dataVencimento: string;
    detalhamento: string;
    qtParcelas: number;
    pagament?: number;
    statusContrato?: number;
    aprovacao?: number;
    andamento?: number;

    //Objetos relacionais no back-end.
    motorista?: Funcionario;
    onibus?: Onibus;
    clientesContrato?: ClientesContrato[];
    subContratoMotoristas?: SubContratoMotorista[];
    subContratoOnibus?: SubContratoOnibus[];
}