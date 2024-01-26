import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Funcionario } from '../interfaces/Funcionario'; 
import { CompartilharListService } from './compartilhar-list.service';
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
export class FuncionarioService {
  apiUrl = (environments.production) ? `${environments.baseApiURL}/Funcionario` : `${environments_prod.baseApiURL}/Funcionario`;
  constructor(private http: HttpClient) { }

  CreateFuncionario(funcionario: Funcionario): Observable<any> {
    return this.http.post<Funcionario>(this.apiUrl, funcionario, httpOptions);
  }
  UpdateFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(this.apiUrl, funcionario, httpOptions);
  }

  GetPaginateAtivos(paginaAtual: number, pesquisa: string): Observable<any> {
    return this.http.get<FuncionariosPaginado>(`${this.apiUrl}/PaginateAtivos/${paginaAtual}/${pesquisa}`);
  }
  GetPaginateInativos(paginaAtual: number, pesquisa: string): Observable<any> {
    return this.http.get<FuncionariosPaginado>(`${this.apiUrl}/PaginateInativos/${paginaAtual}/${pesquisa}`);
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

  GetUsuarios(): Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(`${this.apiUrl}/GetAllUsuarios`);
  }
}
interface FuncionariosPaginado {
  funciList: Funcionario[];
  qtPaginate: number;
}