import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { environments_prod } from '../environments/environments_prod';
import { Lembrete } from '../interfaces/Lembrete';
import { Observable, Subject } from 'rxjs';
import { differenceInDays, differenceInHours, parseISO } from 'date-fns';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LembreteService {
  private apiURL = (environments.production) ? `${environments.baseApiURL}/Lembrete` : `${environments_prod.baseApiURL}/Lembrete`;
  private eventoNotificacao = new Subject<any>();

  constructor(private http: HttpClient) {

  }
  EnviarMensagem(lembrete: Lembrete): Observable<any> {
    return this.http.post<Lembrete>(`${this.apiURL}/EnviarMensagem`, lembrete, httpOptions);
  }
  GetAllLembreteMsg(usuarioId: number, role: string): Observable<Lembrete[]> {
    const roleNumber = (role == "Assistente") ? 1 : 2;
    return this.http.get<Lembrete[]>(`${this.apiURL}/GetAllLembreteMensagens/${usuarioId}/${roleNumber}`);
  }
  GetCountLembreteMsg(usuarioId: number, role: string): Observable<any> {
    const roleNumber = (role == "Assistente") ? 1 : 2;
    return this.http.get<any>(`${this.apiURL}/GetCountLembreteMensagens/${usuarioId}/${roleNumber}`);
  }
  GetAllLembreteNotificacoes(usuarioId: number, role: string): Observable<Lembrete[]> {
    const roleNumber = (role == "Assistente") ? 1 : 2;
    return this.http.get<Lembrete[]>(`${this.apiURL}/GetAllLembreteNotificacoes/${usuarioId}/${roleNumber}`);
  }
  GetCountLembreteNotificacoes(usuarioId: number, role: string): Observable<any> {
    const roleNumber = (role == "Assistente") ? 1 : 2;
    return this.http.get<any>(`${this.apiURL}/GetCountLembreteNotificacoes/${usuarioId}/${roleNumber}`);
  }
  GetAllEnviadasByRemetentId(remetenteId: number): Observable<ResponseEnviadas> {
    return this.http.get<ResponseEnviadas>(`${this.apiURL}/GetAllEnviadasByRemetenteId/${remetenteId}`);
  }
  DeleteMensagemById(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/DeleteMensagemEnviadaById/${id}`);
  }

  //Observadores.
  NotificarEvento(item: any) {
    this.eventoNotificacao.next(item);
  }
  obterEventoNotificacao() {
    return this.eventoNotificacao.asObservable();
  }

  //Ajudantes
  ReturnHoursOrDaysService(dataLembrete: string) {

    const dataAtual = new Date().toISOString();

    const parsedDataLembrete = parseISO(dataLembrete);
    const parsedDataAtual = parseISO(dataAtual);

    const horas = differenceInHours(parsedDataAtual, parsedDataLembrete);
    const dias = differenceInDays(parsedDataAtual, parsedDataLembrete);

    const dados = { dias, horas };

    if (dados.horas > 24) {
      switch (dados.dias) {
        case 1:
          return `há ${dados.dias} dia`;
        default:
          return `há ${dados.dias} dias`;
      }
    } else {
      switch (dados.horas) {
        case 0:
          return "agora mesmo"
        case 1:
          return `há ${dados.horas} hora`;
        default:
          return `há ${dados.horas} horas`;
      }
    }
  }
}

export interface ResponseEnviadas {
  list: Lembrete[];
  listCount: number;
}
