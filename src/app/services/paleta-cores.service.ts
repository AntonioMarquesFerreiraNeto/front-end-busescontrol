import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { PaletaCores } from '../interfaces/PaletaCores';
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
export class PaletaCoresService {

  apiURL = (environments.production) ? `${environments.baseApiURL}/PaletaCores` : `${environments_prod.baseApiURL}/PaletaCores`;

  constructor(private http: HttpClient) { }

  GetPaletas(): Observable<PaletaCores[]> {
    return this.http.get<PaletaCores[]>(this.apiURL);
  }
  CreatePaleta(paleta: PaletaCores): Observable<any> {
    return this.http.post<PaletaCores>(this.apiURL, paleta, httpOptions);
  }
  DeletePaleta(id: number): Observable<PaletaCores> {
    return this.http.delete<PaletaCores>(`${this.apiURL}/${id}`);
  }
}
