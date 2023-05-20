import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {
  public mensagem_error: string = '';
  public mensagem_sucesso: string = '';
  public mensagem_info: string = "";
  constructor() {

  }

  addMensagemError(msg: string) {
    //Excluindo mensagens de outros containers.
    this.closeMensagemSucesso();
    this.closeMensagemInfo();
    this.mensagem_error = msg;
    setTimeout(() =>
      this.closeMensagemError(),
      4900);
  }
  closeMensagemError() {
    this.mensagem_error = '';
  }

  addMensagemSucesso(msg: string) {
    this.closeMensagemError();
    this.closeMensagemInfo();
    this.mensagem_sucesso = msg;
    setTimeout(() =>
      this.closeMensagemSucesso(), 4900);
  }
  closeMensagemSucesso() {
    this.mensagem_sucesso = '';
  }

  addMensagemInfo(msg: string) {
    this.closeMensagemError();
    this.closeMensagemSucesso();
    this.mensagem_info = msg;
    setTimeout(() =>
      this.closeMensagemInfo(),
      4900);
  }
  closeMensagemInfo() {
    this.mensagem_info = '';
  }
}
