import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fornecedor } from '../interfaces/Fornecedor';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class FornecedorServiceService {

  apiURL = "https://localhost:7182/api/Fornecedor";

  constructor(private http: HttpClient) { 

  }

  GetAtivos(paginaAtual: number, status: boolean): Observable<Response>{
    return this.http.get<Response>(`${this.apiURL}/GetAtivos/${paginaAtual}/${status}`);
  }
  GetInativos(paginaAtual: number, status: boolean): Observable<Response>{
    return this.http.get<Response>(`${this.apiURL}/GetInativos/${paginaAtual}/${status}`);
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
