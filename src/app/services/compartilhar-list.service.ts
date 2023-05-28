import { Injectable } from '@angular/core';
import { Onibus } from '../Onibus';
import { Funcionario } from '../Funcionario';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompartilharListService {
  paginaAtualOnibus: number = 1;
  totPaginasOnibus!: number;
  paginaAtualFuncionario: number = 1;
  totPaginasFuncionario!: number;

  apiCorreios = "https://viacep.com.br/ws/";

  constructor(private http: HttpClient){

  }

  private onibusSubject = new BehaviorSubject<Onibus[]>([]);
  onibus$ = this.onibusSubject.asObservable();

  private funcionariosSubject = new BehaviorSubject<Funcionario[]>([]);
  funcionario$ = this.funcionariosSubject.asObservable();
  
  atualizarOnibus(onibus: Onibus[]) {
    this.onibusSubject.next(onibus);
  }
  atualizarFuncionario(funcionarios: Funcionario[]){
    this.funcionariosSubject.next(funcionarios);
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

  GetEnderecoByCep(cep: string): Observable<any>{
    return this.http.get<any>(`${this.apiCorreios}/${cep}/json`);
  }
}
