import { ClientesContrato } from "./ClientesContrato";

export interface ClienteJuridico{
    id?: number;
    nomeFantasia: string;
    razaoSocial: string; 
    cnpj: string;
    inscricaoEstadual: string;
    inscricaoMunicipal: string;
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