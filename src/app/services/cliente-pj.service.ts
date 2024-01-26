import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ClienteJuridico } from '../interfaces/ClienteJuridico';
import { Observable } from 'rxjs';
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
export class ClientePjService {
  private apiURL = (environments.production) ? `${environments.baseApiURL}/ClienteJuridico` : `${environments_prod.baseApiURL}/ClienteJuridico`;
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
  GetClientesAtivos(paginaAtual: number, pesquisa: string): Observable<Response>{
    return this.http.get<Response>(`${this.apiURL}/Ativos/${paginaAtual}/${pesquisa}`);
  }
  GetClientesInativos(paginaAtual: number, pesquisa: string): Observable<Response>{
    return this.http.get<Response>(`${this.apiURL}/Inativos/${paginaAtual}/${pesquisa}`);
  }
}
interface Response{
  clienteList: ClienteJuridico[];
  qtPaginas: number;
}