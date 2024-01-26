import { Funcionario } from "./Funcionario";

export interface Lembrete{
    id?: number;
    conteudo: string;
    data?: string;
    typeLembrete: number;
    nivelAcesso: number;
    funcionario?: Funcionario;
    remetente?: Funcionario;
    funcionarioId?: number;
    remetenteId?: number;
}