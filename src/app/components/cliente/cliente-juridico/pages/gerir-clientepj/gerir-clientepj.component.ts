import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteJuridico } from 'src/app/interfaces/ClienteJuridico';
import { ClientePjService } from 'src/app/services/cliente-pj.service';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { MensagensService } from 'src/app/services/mensagens.service';
@Component({
  selector: 'app-gerir-clientepj',
  templateUrl: './gerir-clientepj.component.html',
  styleUrls: ['./gerir-clientepj.component.css']
})
export class GerirClientepjComponent implements OnInit {

  @Input() cliente!: ClienteJuridico;
  textStatus!: string;
  constructor(public activeModal: NgbActiveModal, private mensagemService: MensagensService, private compartilhamento: CompartilharListService, private clienteService: ClientePjService) {

  }

  ngOnInit(): void {
    if (this.cliente.status == 0) this.textStatus = "Inativar";
    else this.textStatus = "Ativar";
  }

  ActionModal() {
    if (this.cliente.status == 0) {
      this.clienteService.InativarClientePJ(this.cliente.id!).subscribe({
        next: () => {
          this.clienteService.GetClientesAtivos(this.compartilhamento.getPaginaAtualClientePj(), true).subscribe((itens) => {
            if (!itens.clienteList.length && (this.compartilhamento.getPaginaAtualClientePj() - 1) != 0) {
              this.clienteService.GetClientesAtivos(this.compartilhamento.getPaginaAtualClientePj() - 1, true).subscribe((itens) => {
                this.compartilhamento.autualizarClientePj(itens.clienteList);
                this.compartilhamento.setTotPaginaClientePj(itens.qtPaginas);
                this.compartilhamento.setPaginaAtualClientePj(this.compartilhamento.getPaginaAtualClientePj() - 1);
              });
            } else {
              this.compartilhamento.autualizarClientePj(itens.clienteList);
              this.compartilhamento.setTotPaginaClientePj(itens.qtPaginas);
            }
          });
          this.mensagemService.addMensagemSucesso("Inativado com sucesso!");
        },
        error: (error: HttpErrorResponse) => {
          this.mensagemService.addMensagemError(error.error);
        }
      });
    } else{
      this.clienteService.AtivarClientePJ(this.cliente.id!).subscribe({
        next: () => {
          this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualClientePj(), true).subscribe((itens) => {
            if (!itens.clienteList.length && (this.compartilhamento.getPaginaAtualClientePj() - 1) != 0) {
              this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualClientePj() - 1, true).subscribe((itens) => {
                this.compartilhamento.autualizarClientePj(itens.clienteList);
                this.compartilhamento.setTotPaginaClientePj(itens.qtPaginas);
                this.compartilhamento.setPaginaAtualClientePj(this.compartilhamento.getPaginaAtualClientePj() - 1);
              });
            } else {
              this.compartilhamento.autualizarClientePj(itens.clienteList);
              this.compartilhamento.setTotPaginaClientePj(itens.qtPaginas);
            }
          });
          this.mensagemService.addMensagemSucesso("Ativado com sucesso!");
        },
        error: (error: HttpErrorResponse) => {
          this.mensagemService.addMensagemError(error.error);
        }
      });
    }
    this.activeModal.dismiss();
  }

  ReturnCnpjFormatado(cnpj: string) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
}
