import { Injectable } from '@angular/core';
import { Onibus } from '../Onibus';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompartilharListService {
  paginaAtual: number = 1;
  totPaginas!: number;

  private onibusSubject = new BehaviorSubject<Onibus[]>([]);
  onibus$ = this.onibusSubject.asObservable();

  atualizarOnibus(onibus: Onibus[]) {
    this.onibusSubject.next(onibus);
  }

  setPaginaAtual(valor: number) {
    this.paginaAtual = valor;
  }
  getPaginaAtual() {
    return this.paginaAtual;
  }
  setTotPagina(valor: number){
    this.totPaginas = valor;
  }
  getTotPagina(){
    return this.totPaginas;
  }

}
