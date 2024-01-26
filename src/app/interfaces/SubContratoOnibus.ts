import { Contrato } from "./Contrato";
import { Onibus } from "./Onibus";

export interface SubContratoOnibus{
    id?: number;
    contratoId: number;
    onibusId: number;
    dataInicial: string;
    dataFinal: string;
    contrato?: Contrato;
    onibus?: Onibus;
}