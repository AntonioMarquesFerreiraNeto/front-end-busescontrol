import { Injectable } from '@angular/core';
import { APIURLS } from '../interfaces/APIURLS';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Funcionario } from '../interfaces/Funcionario';
import { Onibus } from '../interfaces/Onibus';
import { ClienteFisico } from '../interfaces/ClienteFisico';
import { ClienteJuridico } from '../interfaces/ClienteJuridico';
import { Contrato } from '../interfaces/Contrato';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ClientesContrato } from '../interfaces/ClientesContrato';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  apiURL = "https://localhost:7182/api";
  apiURLContrato = "https://localhost:7182/api/Contrato";
  constructor(private http: HttpClient) { }

  //Métodos auxiliares.
  getMotoritasList(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiURL}/Funcionario/MotoristasVinculacao`);
  }
  getOnibusList(): Observable<Onibus[]> {
    return this.http.get<Onibus[]>(`${this.apiURL}/Onibus/OnibusVinculacao`);
  }
  getClientesPfList(): Observable<ClienteFisico[]> {
    return this.http.get<ClienteFisico[]>(`${this.apiURL}/Cliente/ClientesAutorizados`);
  }
  getClientesPjList(): Observable<ClienteJuridico[]> {
    return this.http.get<ClienteJuridico[]>(`${this.apiURL}/ClienteJuridico/ClientesAutorizados`);
  }
  
  //Métodos de contrato. 
  AdicionarContrato(contrato: Contrato, lista: ClientesContrato[]): Observable<any> {
    const data = { contrato, lista }
    return this.http.post<Contrato>(this.apiURLContrato, data, httpOptions);
  }

  UpdateContrato(contrato: Contrato, lista: ClientesContrato[]) : Observable<Contrato>{
    const data = { contrato, lista }
    return this.http.put<Contrato>(`${this.apiURLContrato}`, data, httpOptions);
  }

  GetContratosAtivos(paginaAtual: number, status: boolean): Observable<Response> {
    return this.http.get<Response>(`${this.apiURLContrato}/GetContratosAtivos/${paginaAtual}/${status}`);
  }

  GetContratosInativos(paginaAtual: number, status: boolean): Observable<Response> {
    return this.http.get<Response>(`${this.apiURLContrato}/GetContratosInativos/${paginaAtual}/${status}`);
  }

  GetContratoById(id: number): Observable<Contrato>{
    return this.http.get<Contrato>(`${this.apiURLContrato}/${id}`);
  }

  AprovarContrato(id: number): Observable<any> {
    return this.http.patch<Contrato>(`${this.apiURLContrato}/Aprovar/${id}`, id);
  }

  RevogarContrato(id: number): Observable<any> {
    return this.http.patch<Contrato>(`${this.apiURLContrato}/Revogar/${id}`, id);
  }

  InativarContrato(id: number): Observable<any> {
    return this.http.patch<Contrato>(`${this.apiURLContrato}/Inativar/${id}`, id);
  }

  downloadFileExcel(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    this.http.get(`${this.apiURLContrato}/RelatorioExcel`, {
      headers: headers,
      responseType: 'blob' // Indica que a resposta será um objeto blob
    }).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Buses control - Contratos ativos.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

}
interface Response {
  contractList: Contrato[];
  qtPaginas: number;
}