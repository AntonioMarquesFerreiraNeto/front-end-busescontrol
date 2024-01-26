import { Financeiro } from "./Financeiro";

export interface Fornecedor{
    id?: number;
    nameOrRazaoSocial: string;
    telefone: string;
    cpf?: string;
    email: string;
    dataFornecedor: string;
    cep: string;
    numeroResidencial: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
    ddd: string;
    cnpj?: string;
    typePessoa: number;
    status?: number;
    financeiros: Financeiro[];
}