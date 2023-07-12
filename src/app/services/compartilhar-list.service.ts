import { Injectable } from '@angular/core';
import { Onibus } from '../interfaces/Onibus'; 
import { Funcionario } from '../interfaces/Funcionario'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClienteFisico } from '../interfaces/ClienteFisico';
import { ClienteJuridico } from '../interfaces/ClienteJuridico';
import { Contrato } from '../interfaces/Contrato';
import { Fornecedor } from '../interfaces/Fornecedor';

@Injectable({
  providedIn: 'root'
})
export class CompartilharListService {
  paginaAtualOnibus: number = 1;
  totPaginasOnibus!: number;

  paginaAtualFuncionario: number = 1;
  totPaginasFuncionario!: number;
  
  paginaAtualCliente: number = 1;
  totPaginasCliente!: number;

  paginaAtualClientePj: number = 1;
  totPaginasClientePj!: number;

  paginaAtualContrato: number = 1;
  totPaginasContrato!: number;

  paginaAtualFornecedor: number = 1;
  totPaginaFornecedor!: number;

  apiCorreios = "https://viacep.com.br/ws/";

  constructor(private http: HttpClient){

  }

  private onibusSubject = new BehaviorSubject<Onibus[]>([]);
  onibus$ = this.onibusSubject.asObservable();

  private funcionariosSubject = new BehaviorSubject<Funcionario[]>([]);
  funcionario$ = this.funcionariosSubject.asObservable();

  private clientesSubject = new BehaviorSubject<ClienteFisico[]>([]);
  cliente$ = this.clientesSubject.asObservable();

  private clientesPjSubject = new BehaviorSubject<ClienteJuridico[]>([]);
  clientePj$ = this.clientesPjSubject.asObservable();

  private contratosSubject = new BehaviorSubject<Contrato[]>([]);
  contrato$ = this.contratosSubject.asObservable();

  private fornecedoresSubject = new BehaviorSubject<Fornecedor[]>([]);
  fornecedores$ = this.fornecedoresSubject.asObservable();
  
  GetEnderecoByCep(cep: string): Observable<any>{
    return this.http.get<any>(`${this.apiCorreios}/${cep}/json`);
  }

  atualizarOnibus(onibus: Onibus[]) {
    this.onibusSubject.next(onibus);
  }
  atualizarFuncionario(funcionarios: Funcionario[]){
    this.funcionariosSubject.next(funcionarios);
  }
  autualizarCliente(clientes: ClienteFisico[]){
    this.clientesSubject.next(clientes);
  }
  autualizarClientePj(clientes: ClienteJuridico[]){
    this.clientesPjSubject.next(clientes);
  }
  atualizarContrato(contratos: Contrato[]){
    this.contratosSubject.next(contratos);
  }
  atualizarFornecedor(fornecedores: Fornecedor[]){
    this.fornecedoresSubject.next(fornecedores);
  }

  setPaginaAtualOnibus(valor: number) {
    this.paginaAtualOnibus = valor;
  }
  getPaginaAtualOnibus() {
    return this.paginaAtualOnibus;
  }
  setTotPaginaOnibus(valor: number){
    this.totPaginasOnibus = valor;
  }
  getTotPaginaOnibus(){
    return this.totPaginasOnibus;
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

  setPaginaAtualFornecedor(value: number){
    this.paginaAtualFornecedor = value;
  }
  getPaginaAtualFornecedor(){
    return this.paginaAtualFornecedor;
  }
  setTotPaginaFornecedor(value: number){
    this.totPaginaFornecedor = value;
  }
  getTotPaginaFornecedor(){
    return this.totPaginaFornecedor;
  }
}
