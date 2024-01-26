import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contrato } from '../interfaces/Contrato';
import { Relatorio } from '../interfaces/Relatorio';
import { environments } from '../environments/environments';
import { environments_prod } from '../environments/environments_prod';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiURL = (environments.production) ? `${environments.baseApiURL}/Relatorio` : `${environments_prod.baseApiURL}/Relatorio`;
  constructor(private http: HttpClient) {

  }

  GetContratosAprovados(statusAndamento: number, pesquisa: string): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.apiURL}/ListContratosAprovados/${statusAndamento}/${pesquisa}`);
  }
  GetPdfContrato(id: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/xlxs');
    const url = `${this.apiURL}/PdfContrato/${id}`;
    return this.http.get(url, { headers: headers, responseType: 'blob' });
  }

  GetRelatorioDash(): Observable<Relatorio> {
    return this.http.get<Relatorio>(`${this.apiURL}/ReturnRelatorio`);
  }

  MonitorarNegocio(): Observable<any>{
    const apiUrl = (environments.production) ? `${environments.baseApiURL}` : `${environments_prod.baseApiURL}`;
    return this.http.head<any>(`${apiUrl}/MonitoramentoNegocio/MonitorarNegocio`);
  }
}

