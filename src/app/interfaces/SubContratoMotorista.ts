import { Contrato } from "./Contrato";
import { Funcionario } from "./Funcionario";

export interface SubContratoMotorista{
    id?: number;
    funcionarioId: number;
    contratoId: number;
    dataInicial: string;
    dataFinal: string;
    funcionario?: Funcionario;
    contrato?: Contrato;
}