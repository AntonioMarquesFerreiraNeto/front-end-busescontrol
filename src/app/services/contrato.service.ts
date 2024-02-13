import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Funcionario } from '../interfaces/Funcionario';
import { Onibus } from '../interfaces/Onibus';
import { ClienteFisico } from '../interfaces/ClienteFisico';
import { ClienteJuridico } from '../interfaces/ClienteJuridico';
import { Contrato } from '../interfaces/Contrato';
import { ClientesContrato } from '../interfaces/ClientesContrato';
import { MensagensService } from './mensagens.service';
import { environments } from '../environments/environments';
import { environments_prod } from '../environments/environments_prod';
import { SubContratoMotorista } from '../interfaces/SubContratoMotorista';
import { SubContratoOnibus } from '../interfaces/SubContratoOnibus';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private apiURL = (environments.production) ? environments.baseApiURL : environments_prod.baseApiURL;
  private apiURLContrato = `${this.apiURL}/Contrato`;
  constructor(private http: HttpClient, private mensagemService: MensagensService) { }

  //Métodos auxiliares.
  getMotoritasList(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiURL}/Funcionario/MotoristasVinculacao`);
  }
  getOnibusList(): Observable<Onibus[]> {
    return this.http.get<Onibus[]>(`${this.apiURL}/Onibus/OnibusVinculacao`);
  }
  getClientesPfList(): Observable<ClienteFisico[]> {
    return this.http.get<ClienteFisico[]>(`${this.apiURL}/Cliente/ClientesAdimplentes`);
  }
  getClientesPjList(): Observable<ClienteJuridico[]> {
    return this.http.get<ClienteJuridico[]>(`${this.apiURL}/ClienteJuridico/ClientesAutorizados`);
  }
  getClientesContractEditPfList(contratoId: number): Observable<ClienteFisico[]> {
    return this.http.get<ClienteFisico[]>(`${this.apiURL}/Cliente/ClientesAdimplentesContratoEdit/${contratoId}`);
  }
  getClientesContractEditPjList(contratoId: number): Observable<ClienteJuridico[]> {
    return this.http.get<ClienteJuridico[]>(`${this.apiURL}/ClienteJuridico/ClientesAdimplentesContratoEdit/${contratoId}`);
  }

  //Métodos de contrato. 
  AdicionarContrato(contrato: Contrato, lista: ClientesContrato[]): Observable<any> {
    const data = { contrato, lista }
    return this.http.post<Contrato>(this.apiURLContrato, data, httpOptions);
  }

  UpdateContrato(contrato: Contrato, lista: ClientesContrato[]): Observable<Contrato> {
    const data = { contrato, lista }
    return this.http.put<Contrato>(`${this.apiURLContrato}`, data, httpOptions);
  }

  GetContratosAtivos(paginaAtual: number, filtro: number, pageSize: number, pesquisa: string): Observable<Response> {
    return this.http.get<Response>(`${this.apiURLContrato}/GetContratosAtivos/${paginaAtual}/${filtro}/${pageSize}/${pesquisa}`);
  }

  GetContratosInativos(paginaAtual: number, pesquisa: string): Observable<Response> {
    return this.http.get<Response>(`${this.apiURLContrato}/GetContratosInativos/${paginaAtual}/${pesquisa}`);
  }

  GetContratoById(id: number): Observable<Contrato> {
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

  downloadFileExcel(ativosSelect: boolean) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/xlxs');
    const url = `${this.apiURLContrato}/RelatorioExcel/${ativosSelect}`;
    return this.http.get(url, { headers: headers, responseType: 'blob' })
  }

  downloadPdfRelatorio(ativo: boolean) {
    let headers = new HttpHeaders();
    const url = `${this.apiURLContrato}/RelatorioPDF/${ativo}`;
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(url, { headers: headers, responseType: 'blob' });
  }

  downloadContratoCliente(id: number, clientePfId: number, clientePjId: number) {
    let headers = new HttpHeaders();
    const url = `${this.apiURLContrato}/PdfContratoCliente/${id}/${clientePfId}/${clientePjId}`;
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(url, { headers: headers, responseType: 'blob' });
  }

  downloadPdfRescisao(id: number) {
    let headers = new HttpHeaders();
    const url = `${this.apiURLContrato}/PdfRescisao/${id}`;
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(url, { headers: headers, responseType: 'blob' });
  }

  confirmRescisao(contratoId: number, clienteId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURLContrato}/ConfirmRescisao/${contratoId}/${clienteId}`);
  }

  NewSubContratoMotorista(data: SubContratoMotorista): Observable<any>{
    return this.http.post(`${this.apiURLContrato}/NewSubContratoMotorista`, data, httpOptions)
  }
  UpdateSubContratoMotorista(data: SubContratoMotorista): Observable<any>{
    return this.http.put(`${this.apiURLContrato}/UpdateSubContratoMotorista`, data, httpOptions);
  }
  RemoveSubContratoMotorista(id: number): Observable<any>{
    return this.http.delete(`${this.apiURLContrato}/DeleteSubContratoMotorista/${id}`)
  }

  NewSubContratoOnibus(data: SubContratoOnibus): Observable<any>{
    return this.http.post<Contrato>(`${this.apiURLContrato}/NewSubOnibusContrato`, data, httpOptions);
  }
  UpdateSubContratoOnibus(data: SubContratoOnibus): Observable<any>{
    return this.http.put<Contrato>(`${this.apiURLContrato}/UpdateSubOnibusContrato`, data, httpOptions);
  }
  RemoveSubContratoOnibus(id: number): Observable<any>{
    return this.http.delete<Contrato>(`${this.apiURLContrato}/DeleteSubOnibusContrato/${id}`);
  }

}
interface Response {
  contractList: Contrato[];
  qtPaginas: number;
}