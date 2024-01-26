import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteFisico } from '../interfaces/ClienteFisico';
import { ClienteJuridico } from '../interfaces/ClienteJuridico';
import { Fornecedor } from '../interfaces/Fornecedor';
import { Financeiro } from '../interfaces/Financeiro';
import { Parcela } from '../interfaces/Parcela';
import { environments } from '../environments/environments';
import { environments_prod } from '../environments/environments_prod';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {
  private apiURLDepedencias = (environments.production) ? `${environments.baseApiURL}` : `${environments_prod.baseApiURL}`;
  private apiURLFinanceiro = `${this.apiURLDepedencias}/Financeiro`;
  constructor(private http: HttpClient) {

  }

  getAllClientesFisicos(): Observable<ClienteFisico[]> {
    return this.http.get<ClienteFisico[]>(`${this.apiURLDepedencias}/Cliente/ClientesAutorizados`);
  }
  getAllClientesJuridicos(): Observable<ClienteJuridico[]> {
    return this.http.get<ClienteJuridico[]>(`${this.apiURLDepedencias}/ClienteJuridico/ClientesAutorizados`);
  }
  getAllFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.apiURLDepedencias}/Fornecedor/FornecedoresAutorizados`);
  }

  NewLancamento(financeiro: Financeiro): Observable<any> {
    return this.http.post<any>(`${this.apiURLFinanceiro}`, financeiro, httpOptions);
  }

  EditLancamento(financeiro: Financeiro): Observable<Financeiro> {
    return this.http.put<Financeiro>(`${this.apiURLFinanceiro}`, financeiro, httpOptions);
  }

  GetListFinanceiro(pageNumber: number, pesquisa: string, filtro: number = 4, pageSize: number = 10): Observable<Response> {
    return this.http.get<Response>(`${this.apiURLFinanceiro}/GetFinanceiro/${pageNumber}/${filtro}/${pageSize}/${pesquisa}`);
  }

  InativarFinanceiro(id: number): Observable<Financeiro> {
    return this.http.patch<Financeiro>(`${this.apiURLFinanceiro}/InativarFinanceiro/${id}`, id);
  }

  GetFinanceiroById(id: number): Observable<Financeiro> {
    return this.http.get<Financeiro>(`${this.apiURLFinanceiro}/GetFinanceiroById/${id}`);
  }

  ContabilizarPagamento(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiURLFinanceiro}/ContabilizarPagamento/${id}`, id);
  }

  GetPaginationAndFiltroParcelas(id: number, pageNumber: number, pageSize: number, pesquisa: string): Observable<ResponseParcela> {
    return this.http.get<ResponseParcela>(`${this.apiURLFinanceiro}/PagAndFiltrosParcelas/${id}/${pageNumber}/${pageSize}/${pesquisa}`);
  }

  GetPlanilhaFinanceiro(filtro: number, pesquisa: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'Application/xlsx')
    const url = `${this.apiURLFinanceiro}/GetPlanilhaFinanceiro/${filtro}/${pesquisa}`;
    return this.http.get(url, {headers: headers, responseType: 'blob'});
  }

  GetRelatorioParcelasExcel(financeiroId: number) {
    let headers = new HttpHeaders();
    const url = `${this.apiURLFinanceiro}/GetRelatorioParcelas/${financeiroId}`;
    headers = headers.set('Accept', 'application/xlsx');
    return this.http.get(url, {headers: headers, responseType: 'blob'});
  }
  GetRelatorioParcelasPdf(financeiroId: number) {
    let headers = new HttpHeaders();
    const url = `${this.apiURLFinanceiro}/GetRelatorioParcelasPdf/${financeiroId}`;
    headers = headers.set('Accept', 'Application/pdf');
    return this.http.get(url, { headers: headers, responseType: 'blob' });
  }
  GetPdfFinanceiro(filtro: number, pesquisa: string) {
    let headers = new HttpHeaders();
    const url = `${this.apiURLFinanceiro}/GetRelatorioFinanceiroPdf/${filtro}/${pesquisa}`;
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(url, { headers: headers, responseType: 'blob' });
  }
}
interface Response {
  listFinanceiro: Financeiro[];
  qtPaginas: number;
}
interface ResponseParcela {
  listParcela: Parcela[];
  qtPaginas: number;
}
