export interface Funcionario{
    id?: number;
    name: string;
    dataNascimento: string;
    cpf: string;
    email: string;
    telefone: string;
    cargo: number;
    cep: string;
    complementoResidencial: string;
    numeroResidencial: string;
    logradouro: string;
    ddd: string;
    bairro: string;
    cidade: string;
    estado: string;
    status?: number;
    statusUsuario?: number;
}