import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fornecedor } from '../interfaces/Fornecedor';
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

export class FornecedorServiceService {

  private apiURL = (environments.production) ? `${environments.baseApiURL}/Fornecedor` : `${environments_prod.baseApiURL}/Fornecedor`;

  constructor(private http: HttpClient) { 

  }

  GetAtivos(paginaAtual: number, filtro: number, pesquisa: string): Observable<Response>{
    return this.http.get<Response>(`${this.apiURL}/GetAtivos/${paginaAtual}/${filtro}/${pesquisa}`);
  }
  GetInativos(paginaAtual: number, filtro: number, pesquisa: string): Observable<Response>{
    return this.http.get<Response>(`${this.apiURL}/GetInativos/${paginaAtual}/${filtro}/${pesquisa}`);
  }
  GetFornecedorById(id: number): Observable<Fornecedor>{
    return this.http.get<Fornecedor>(`${this.apiURL}/${id}`);
  }
  Create(fornecedor: Fornecedor): Observable<any>{
    return this.http.post<Fornecedor>(`${this.apiURL}`, fornecedor,httpOptions);
  }
  Update(fornecedor: Fornecedor): Observable<Fornecedor>{
    return this.http.put<Fornecedor>(`${this.apiURL}`, fornecedor, httpOptions);
  }
  InativarFornecedor(id: number): Observable<any>{
    return this.http.patch<any>(`${this.apiURL}/Inativar/${id}`, id);
  }
  AtivarFornecedor(id: number): Observable<any>{
    return this.http.patch<any>(`${this.apiURL}/Ativar/${id}`, id);
  }
}
interface Response{
  qtPaginas: number;
  fornecedorList: Fornecedor[];
}
