import { ClienteFisico } from "./ClienteFisico";
import { ClienteJuridico } from "./ClienteJuridico";
import { Contrato } from "./Contrato";

export interface ClientesContrato {
    id?: number;
    contratoId?: number;
    pessoaJuridicaId?: number;
    pessoaFisicaId?: number;
    pessoaFisica?: ClienteFisico;
    pessoaJuridica?: ClienteJuridico;
    contrato?: Contrato
    dataEmissaoPdfRescisao?: string;   
    processRescisao?: number;
}