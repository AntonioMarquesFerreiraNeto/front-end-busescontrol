import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Onibus } from '../Onibus';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OnibusService {
  apiUrl = "https://localhost:7182/api/Onibus";
  constructor(private http: HttpClient) {

  }

  CreateOnibus(onibus: Onibus): Observable<any> {
    console.log("Deu tudo certo!");
    return this.http.post<Onibus>(this.apiUrl, onibus, httpOptions);
  }
  GetOnibusPaginateAtivos(paginaAtual: number, statusPaginacao: boolean): Observable<any> {
    return this.http.get<OnibusPaginado>(`${this.apiUrl}/PaginateListAtivos/${paginaAtual}/${statusPaginacao}`);
  }
  GetOnibusPaginateInativos(paginaAtual: number, statusPaginacao: boolean): Observable<any> {
    return this.http.get<OnibusPaginado>(`${this.apiUrl}/PaginateListInativos/${paginaAtual}/${statusPaginacao}`);
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
}
interface OnibusPaginado{
  onibusList: Onibus[];
  qtPaginate: number;
}