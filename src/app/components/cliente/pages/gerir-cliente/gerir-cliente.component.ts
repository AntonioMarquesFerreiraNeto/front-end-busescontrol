import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { combineAll } from 'rxjs';
import { ClienteFisico } from 'src/app/interfaces/ClienteFisico';
import { ClienteService } from 'src/app/services/cliente.service';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-gerir-cliente',
  templateUrl: './gerir-cliente.component.html',
  styleUrls: ['./gerir-cliente.component.css']
})
export class GerirClienteComponent implements OnInit {
  @Input() cliente!: ClienteFisico;
  textStatus!: string;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();

  constructor(public modal: NgbActiveModal, private datePipe: DatePipe, private clienteService: ClienteService, private mensagemService: MensagensService) {

  }
  ngOnInit(): void {
    if (this.cliente.status == 0) this.textStatus = "inativar";
    else this.textStatus = "ativar";
  }

  ActionModal() {
    if (this.cliente.status == 0) {
      this.clienteService.InativarCliente(this.cliente.id!).subscribe({
        next: () => {
          this.onSubmitted.emit();
          this.mensagemService.addMensagemSucesso("Inativado com sucesso!");
        },
        error: (error: HttpErrorResponse) => {
          this.mensagemService.addMensagemError(error.error);
        }
      });
    } else {
      this.clienteService.AtivarCliente(this.cliente.id!).subscribe({
        next: () => {
          this.mensagemService.addMensagemSucesso("Ativado com sucesso!");
          this.onSubmitted.emit();
        },
        error: (error: HttpErrorResponse) => {
          this.mensagemService.addMensagemError(error.error);
        }
      });
    }
    this.modal.dismiss();
  }

  ReturnDateCliente(data: string) {
    const dataFormatada = this.datePipe.transform(data, "dd/MM/yyyy");
    return dataFormatada;
  }

  ReturnCpfFormatado(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
