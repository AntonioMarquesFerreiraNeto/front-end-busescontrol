import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ClienteFisico } from '../interfaces/ClienteFisico';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  apiURL = "https://localhost:7182/api/Cliente";
  constructor(private http: HttpClient) {
  }

  CreateCliente(cliente: ClienteFisico): Observable<any> {
    return this.http.post<ClienteFisico>(this.apiURL, cliente, httpOptions);
  }
  UpdateCliente(cliente: ClienteFisico): Observable<any>{
    return this.http.put<ClienteFisico>(this.apiURL, cliente, httpOptions);
  }

  GetClientes(paginaAtual: number, status: boolean): Observable<ClienteResponse>{
    return this.http.get<ClienteResponse>(`${this.apiURL}/Ativos/${paginaAtual}/${status}`);
  }
  GetClientesInativos(paginaAtual: number, status: boolean): Observable<ClienteResponse>{
    return this.http.get<ClienteResponse>(`${this.apiURL}/Inativos/${paginaAtual}/${status}`);
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
}
interface ClienteResponse{
  clienteList: ClienteFisico[];
  qtPaginas: number;
}