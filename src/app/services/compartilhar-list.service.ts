import { Injectable } from '@angular/core';
import { Onibus } from '../interfaces/Onibus'; 
import { Funcionario } from '../interfaces/Funcionario'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClienteFisico } from '../interfaces/ClienteFisico';
import { ClienteJuridico } from '../interfaces/ClienteJuridico';

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
