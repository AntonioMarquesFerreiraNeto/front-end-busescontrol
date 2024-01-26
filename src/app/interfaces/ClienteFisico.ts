import { ClientesContrato } from "./ClientesContrato";

export interface ClienteFisico {
    id?: number;
    name: string;
    cpf: string; 
    dataNascimento: string;
    rg: string;
    nameMae: string;
    email: string;
    telefone: string;
    cep: string;
    complementoResidencial: string;
    numeroResidencial: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
    ddd: string;
    idVinculacaoContratual?: number;
    status?: number;
    adimplente?: number;
    clientesContrato?: ClientesContrato[];
}