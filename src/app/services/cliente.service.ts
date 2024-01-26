import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ClienteFisico } from '../interfaces/ClienteFisico';
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
export class ClienteService {
  private apiURL = (environments.production) ? `${environments.baseApiURL}/Cliente` : `${environments_prod.baseApiURL}/Cliente`;
  constructor(private http: HttpClient) {
  }

  CreateCliente(cliente: ClienteFisico): Observable<any> {
    return this.http.post<ClienteFisico>(this.apiURL, cliente, httpOptions);
  }
  UpdateCliente(cliente: ClienteFisico): Observable<any>{
    return this.http.put<ClienteFisico>(this.apiURL, cliente, httpOptions);
  }

  GetClientes(paginaAtual: number, pesquisa: string): Observable<ClienteResponse>{
    return this.http.get<ClienteResponse>(`${this.apiURL}/Ativos/${paginaAtual}/${pesquisa}`);
  }
  GetClientesInativos(paginaAtual: number, pesquisa: string): Observable<ClienteResponse>{
    return this.http.get<ClienteResponse>(`${this.apiURL}/Inativos/${paginaAtual}/${pesquisa}`);
  }

  GetClienteById(id: number): Observable<ClienteFisico>{
    return this.http.get<ClienteFisico>(`${this.apiURL}/${id}`);
  }

  InativarCliente(id: number): Observable<any>{
    return this.http.patch<any>(`${this.apiURL}/InativarCliente/${id}`, id);
  }
  AtivarCliente(id: number): Observable<any>{
    return this.http.patch<any>(`${this.apiURL}/AtivarCliente/${id}`, id);
  }

  GetClientesAutorizados(): Observable<ClienteFisico[]>{
    return this.http.get<ClienteFisico[]>(`${this.apiURL}/ClientesAutorizados`);
  }

  GetClienteResponsavel(id: number){
    return this.http.get<ClienteFisico>(`${this.apiURL}/ClienteResponsavel/${id}`);
  }
}
interface ClienteResponse{
  clienteList: ClienteFisico[];
  qtPaginas: number;
}