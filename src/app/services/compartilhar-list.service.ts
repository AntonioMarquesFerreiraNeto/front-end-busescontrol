import { Injectable } from '@angular/core';
import { Onibus } from '../interfaces/Onibus'; 
import { Funcionario } from '../interfaces/Funcionario'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClienteFisico } from '../interfaces/ClienteFisico';
import { ClienteJuridico } from '../interfaces/ClienteJuridico';
import { Contrato } from '../interfaces/Contrato';
import { Fornecedor } from '../interfaces/Fornecedor';
import { EstadoAndUF } from '../interfaces/EstadoAndUF';
import { environments } from '../environments/environments';
import { environments_prod } from '../environments/environments_prod';

@Injectable({
  providedIn: 'root'
})
export class CompartilharListService {
  paginaAtualFuncionario: number = 1;
  totPaginasFuncionario!: number;
  
  paginaAtualCliente: number = 1;
  totPaginasCliente!: number;

  paginaAtualClientePj: number = 1;
  totPaginasClientePj!: number;

  paginaAtualContrato: number = 1;
  totPaginasContrato!: number;
  pesquisaContrato: string = "";
  filtroContrato: number = 6;
  pageSizeContrato: number = 20;

  apiCorreios = "https://viacep.com.br/ws/";

  constructor(private http: HttpClient){

  }

  private clientesPjSubject = new BehaviorSubject<ClienteJuridico[]>([]);
  clientePj$ = this.clientesPjSubject.asObservable();

  private contratosSubject = new BehaviorSubject<Contrato[]>([]);
  contrato$ = this.contratosSubject.asObservable();
  
  GetEnderecoByCep(cep: string): Observable<any>{
    return this.http.get<any>(`${this.apiCorreios}/${cep}/json`);
  }
  GetEstadoAndUfList(): Observable<EstadoAndUF[]>{
    const urlAPI = (environments.production) ? environments.baseApiURL : environments_prod.baseApiURL;
    return this.http.get<EstadoAndUF[]>(`${urlAPI}/InformacoesApoio/GetEstadoAndUfList`);
  }
  autualizarClientePj(clientes: ClienteJuridico[]){
    this.clientesPjSubject.next(clientes);
  }
  atualizarContrato(contratos: Contrato[]){
    this.contratosSubject.next(contratos);
  }

  setPaginaAtualFuncionario(value: number){
    this.paginaAtualFuncionario = value;
  }
  getPaginaAtualFuncionario(){
    return this.paginaAtualFuncionario;
  }
  setTotPaginaFuncionario(value: number){
    this.totPaginasFuncionario = value;
  }
  getTotPaginaFuncionario(){
    return this.totPaginasFuncionario;
  }

  setPaginaAtualCliente(value: number){
    this.paginaAtualCliente = value;
  }
  getPaginaAtualCliente(){
    return this.paginaAtualCliente;
  }
  setTotPaginaCliente(value: number){
    this.totPaginasCliente = value;
  }
  getTotPaginaCliente(){
    return this.totPaginasCliente;
  }

  setPaginaAtualContrato(value: number){
    this.paginaAtualContrato = value;
  }
  getPaginaAtualContrato(){
    return this.paginaAtualContrato;
  }
  setTotPaginaContrato(value: number){
    this.totPaginasContrato = value;
  }
  getTotPaginaContrato(){
    return this.totPaginasContrato;
  }
  setPesquisaContrato(pesquisa: string){
    this.pesquisaContrato = pesquisa;
  }
  getPesquisaContrato(){
    return this.pesquisaContrato;
  }
  setFiltroContrato(filtro: number){
    this.filtroContrato = filtro;
  }
  getFiltroContrato(){
    return this.filtroContrato;
  }
  setPageSizeContrato(pageSize: number){
    this.pageSizeContrato = pageSize;
  }
  getPageSizeContrato(){
    return this.pageSizeContrato;
  }

  setPaginaAtualClientePj(value: number){
    this.paginaAtualClientePj = value;
  }
  getPaginaAtualClientePj(){
    return this.paginaAtualClientePj;
  }
  setTotPaginaClientePj(value: number){
    this.totPaginasClientePj = value;
  }
  getTotPaginaClientePj(){
    return this.totPaginasClientePj;
  }
}
