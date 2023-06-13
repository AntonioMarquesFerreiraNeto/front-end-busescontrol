import { Injectable } from '@angular/core';
import { APIURLS } from '../interfaces/APIURLS';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Funcionario } from '../interfaces/Funcionario';
import { Onibus } from '../interfaces/Onibus';
import { ClienteFisico } from '../interfaces/ClienteFisico';
import { ClienteJuridico } from '../interfaces/ClienteJuridico';

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
  constructor(private http: HttpClient) { }

  getMotoritasList(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiURL}/Funcionario/MotoristasVinculacao`);
  }
  getOnibusList(): Observable<Onibus[]>{
    return this.http.get<Onibus[]>(`${this.apiURL}/Onibus/OnibusVinculacao`);
  }
  getClientesPfList(): Observable<ClienteFisico[]>{
    return this.http.get<ClienteFisico[]>(`${this.apiURL}/Cliente/ClientesAutorizados`);
  }
  getClientesPjList(): Observable<ClienteJuridico[]>{
    return this.http.get<ClienteJuridico[]>(`${this.apiURL}/ClienteJuridico/ClientesAutorizados`);
  }
}
