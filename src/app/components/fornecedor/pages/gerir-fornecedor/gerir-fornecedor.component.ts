import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Fornecedor } from 'src/app/interfaces/Fornecedor';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { FornecedorServiceService } from 'src/app/services/fornecedor-service.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-gerir-fornecedor',
  templateUrl: './gerir-fornecedor.component.html',
  styleUrls: ['./gerir-fornecedor.component.css']
})
export class GerirFornecedorComponent implements OnInit {
  @Input() fornecedor!: Fornecedor;
  textStatus!: string;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();

  constructor(public activeModal: NgbActiveModal, private mensagemService: MensagensService, private datePipe: DatePipe,
    private fornecedorService: FornecedorServiceService, private compartilhar: CompartilharListService) { }

  ngOnInit(): void {
    if (!this.fornecedor) {
      this.mensagemService.addMensagemError("Desculpe, fornecedor não encontrado!");
      this.activeModal.dismiss();
    }
    if (this.fornecedor.status == 0) this.textStatus = "inativar";
    else this.textStatus = "ativar";
  }

  ActionModal() {
    if (this.fornecedor.status == 0) {
      this.fornecedorService.InativarFornecedor(this.fornecedor.id!).subscribe({
        next: () => {
          this.onSubmitted.emit();
          this.mensagemService.addMensagemSucesso("Inativado com sucesso!");
        },
        error: (error: HttpErrorResponse) => {
          this.mensagemService.addMensagemError(error.error);
        }
      });
    } else {
      this.fornecedorService.AtivarFornecedor(this.fornecedor.id!).subscribe({
        next: () => {
          this.onSubmitted.emit();
          this.mensagemService.addMensagemSucesso("Ativado com sucesso!");
        },
        error: (error: HttpErrorResponse) => {
          this.mensagemService.addMensagemError(error.error);
        }
      });
    }
    this.activeModal.dismiss();
  }

  ReturnCpfOrCnpj() {
    if (this.fornecedor.typePessoa == 0) {
      const cpfFormatado = this.fornecedor.cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); 
      return cpfFormatado;
    } else {
      const cnpjFormatado = this.fornecedor.cnpj!.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      return cnpjFormatado;
    }
  }

  ReturnDateFormatado(){
    const dataFormatada = this.datePipe.transform(this.fornecedor.dataFornecedor, "dd/MM/yyyy");
    return dataFormatada;
  }
}
