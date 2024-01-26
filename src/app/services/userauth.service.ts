import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from '../interfaces/User';
import { Login } from '../interfaces/Login';
import { Router } from '@angular/router';
import { MensagensService } from './mensagens.service';
import { EsqueceuSenha } from '../interfaces/esqueceuSenha';
import { Observable, Subject } from 'rxjs';
import { RedefinirSenha } from '../interfaces/redefinirSenha';
import { AlterSenha } from '../interfaces/AlterarSenha';
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
export class UserauthService {
  private apiURL = (environments.production) ? `${environments.baseApiURL}/Usuario` : `${environments_prod.baseApiURL}/Usuario`;
  private emitRequestFinish = new Subject<void>();
  constructor(private http: HttpClient, private router: Router, private mensagemService: MensagensService) {
  }

  Autenticar(login: Login) {
    this.http.post<any>(`${this.apiURL}/Autenticar`, login, httpOptions).subscribe({
      next: (data) => {
        localStorage.setItem("userAuth", JSON.stringify(true));
        localStorage.setItem("token", JSON.stringify(data));
        this.SetUserAutenticado();
        if (localStorage.getItem("userAuth")) {
          window.location.href = "/home";
        }
      },
      error: (error: HttpErrorResponse) => {
        this.emitRequestFinish.next();
        if (error.status == 0) {
          this.mensagemService.addMensagemError("Desculpe, não conseguimos processar sua solicitação.");
          return;
        }
        this.mensagemService.addMensagemError(error.error);
      }
    });
  }
  GetAuthRequestFinish(){
    return this.emitRequestFinish.asObservable();
  }

  SetUserAutenticado() {
    const token = localStorage.getItem('token');
    if (token) {
      const [, payloadB64] = token.split('.');
      const payloadObj = JSON.parse(atob(payloadB64));
      const name = decodeURIComponent(escape(payloadObj.name));
      const email = decodeURIComponent(escape(payloadObj.email))
      const usuario: Usuario = {
        nameid: Number(payloadObj.nameid),
        name: name,
        role: payloadObj.role,
        email: email,
        birthdate: payloadObj.birthdate,
      };
      localStorage.setItem("usuarioAutenticado", JSON.stringify(usuario));
    }
  }

  Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioAutenticado");
    localStorage.removeItem("userAuth");
    window.location.href = "/login";
  }

  EsqueceuSenha(esqueceuSenha: EsqueceuSenha): Observable<any>{
    return this.http.post<any>(`${this.apiURL}/EsqueceuSenha`, esqueceuSenha, httpOptions);
  }
  RedefinirSenha(redefinirSenha: RedefinirSenha): Observable<any>{
    return this.http.put<RedefinirSenha>(`${this.apiURL}/RedefinirSenha`, redefinirSenha, httpOptions);
  }

  ConsultChaveRedefinition(chave: string): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/ConsultChaveRedefinition/${chave}`);
  }

  AlterarPassword(alterarSenha: AlterSenha): Observable<any>{
    return this.http.put<any>(`${this.apiURL}/AlterarSenha`, alterarSenha, httpOptions);
  }

}
