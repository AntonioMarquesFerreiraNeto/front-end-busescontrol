import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Funcionario } from '../Funcionario';
import { CompartilharListService } from './compartilhar-list.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  apiUrl = "https://localhost:7182/api/Funcionario";
  constructor(private http: HttpClient) { }

  CreateFuncionario(funcionario: Funcionario): Observable<any> {
    return this.http.post<Funcionario>(this.apiUrl, funcionario, httpOptions);
  }
  UpdateFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(this.apiUrl, funcionario, httpOptions);
  }

  GetPaginateAtivos(paginaAtual: number, statusPaginacao: boolean): Observable<any> {
    return this.http.get<FuncionariosPaginado>(`${this.apiUrl}/PaginateAtivos/${paginaAtual}/${statusPaginacao}`);
  }
  GetPaginateInativos(paginaAtual: number, statusPaginacao: boolean): Observable<any> {
    return this.http.get<FuncionariosPaginado>(`${this.apiUrl}/PaginateInativos/${paginaAtual}/${statusPaginacao}`);
  }
  GetFuncionarioById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`);
  }

  InativarFuncionario(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/InativarFuncionario/${id}`, id);
  }
  AtivarFuncionario(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/AtivarFuncionario/${id}`, id);
  }
  InativarUsuario(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/InativarUsuario/${id}`, id);
  }
  AtivarUsuario(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/AtivarUsuario/${id}`, id);
  }
}
interface FuncionariosPaginado {
  funciList: Funcionario[];
  qtPaginate: number;
}