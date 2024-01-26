import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Onibus } from '../interfaces/Onibus';
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
export class OnibusService {
  apiUrl = (environments.production) ? `${environments.baseApiURL}/Onibus` : `${environments_prod.baseApiURL}/Onibus`;
  constructor(private http: HttpClient) {

  }

  CreateOnibus(onibus: Onibus): Observable<any> {
    console.log("Deu tudo certo!");
    return this.http.post<Onibus>(this.apiUrl, onibus, httpOptions);
  }
  GetOnibusPaginateAtivos(paginaAtual: number, pesquisa: string): Observable<any> {
    return this.http.get<OnibusPaginado>(`${this.apiUrl}/PaginateListAtivos/${paginaAtual}/${pesquisa}`);
  }
  GetOnibusPaginateInativos(paginaAtual: number, pesquisa: string): Observable<any> {
    return this.http.get<OnibusPaginado>(`${this.apiUrl}/PaginateListInativos/${paginaAtual}/${pesquisa}`);
  }
  InativarOnibus(id: number) {
    return this.http.patch(`${this.apiUrl}/Inativar/${id}`, id);
  }
  AtivarOnibus(id: number) {
    return this.http.patch(`${this.apiUrl}/Ativar/${id}`, id);
  }
  DeteleOnibus(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  GetOnibusById(id: number): Observable<Onibus> {
    return this.http.get<Onibus>(`${this.apiUrl}/${id}`);
  }
  UpdateOnibus(onibus: Onibus): Observable<any> {
    return this.http.put<Onibus>(this.apiUrl, onibus, httpOptions);
  }
  HabilitarDisponibilidade(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/HabilitarDisponibilidade/${id}`, id);
  }
  DesabilitarDisponibilidade(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/DesabilitarDisponibilidade/${id}`, id);
  }
}
interface OnibusPaginado {
  onibusList: Onibus[];
  qtPaginate: number;
}