import { Contrato } from "./Contrato";

export interface Onibus {
  id?: number;
  marca: string;
  nameBus: string;
  dataFabricacao: string;
  renavam: string;
  placa: string;
  chassi: string;
  assentos: string;
  corBus?: string;
  statusOnibus?: number;
  disponibilidade?: number;
  contratos?: Contrato[];
}
