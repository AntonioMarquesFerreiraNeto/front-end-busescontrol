import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ClienteJuridico } from '../interfaces/ClienteJuridico';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClientePjService {
  apiURL = "https://localhost:7182/api/ClienteJuridico"
  constructor(private http: HttpClient) { }

  CreateClientePJ(cliente: ClienteJuridico): Observable<any>{
    return this.http.post<ClienteJuridico>(this.apiURL, cliente, httpOptions);
  }
  UpdateClientePJ(cliente: ClienteJuridico): Observable<ClienteJuridico>{
    return this.http.put<ClienteJuridico>(this.apiURL, cliente, httpOptions);
  }
  InativarClientePJ(id: number): Observable<any>{
    return this.http.patch<any>(`${this.apiURL}/Inativar/${id}`, id);
  }
  AtivarClientePJ(id: number): Observable<any>{
    return this.http.patch<any>(`${this.apiURL}/Ativar/${id}`, id);
  }

  GetClienteById(id: number): Observable<ClienteJuridico>{
    return this.http.get<ClienteJuridico>(`${this.apiURL}/${id}`);
  }
  GetClientesAtivos(paginaAtual: number, status: boolean): Observable<Response>{
    return this.http.get<Response>(`${this.apiURL}/Ativos/${paginaAtual}/${status}`);
  }
  GetClientesInativos(paginaAtual: number, status: boolean): Observable<Response>{
    return this.http.get<Response>(`${this.apiURL}/Inativos/${paginaAtual}/${status}`);
  }
}
interface Response{
  clienteList: ClienteJuridico[];
  qtPaginas: number;
}