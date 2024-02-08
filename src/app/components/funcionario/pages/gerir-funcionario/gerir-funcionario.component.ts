import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { LembreteService } from 'src/app/services/lembrete.service';
@Component({
  selector: 'app-gerir-funcionario',
  templateUrl: './gerir-funcionario.component.html',
  styleUrls: ['./gerir-funcionario.component.css']
})
export class GerirFuncionarioComponent implements OnInit {
  textStatus!: string;
  @Input() funcionario!: Funcionario;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  constructor(public activeModal: NgbActiveModal, private funcionarioService: FuncionarioService, private mensagemService: MensagensService, private lembreteService: LembreteService, private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    if (this.funcionario.status! == 0) {
      this.textStatus = "inativar";
    } else {
      this.textStatus = "ativar";
    }
  }

  ActionHandler() {
    if (this.funcionario) {
      if (this.funcionario.status == 0) {
        this.funcionarioService.InativarFuncionario(this.funcionario.id!).subscribe({
          next: () => {
            this.mensagemService.addMensagemSucesso("Inativado com sucesso!");
            this.onSubmitted.emit();
          },
          error: (error: HttpErrorResponse) => {
            this.mensagemService.addMensagemError(error.error);
          }
        });
      } else {
        this.funcionarioService.AtivarFuncionario(this.funcionario.id!).subscribe({
          next: () => {
            this.mensagemService.addMensagemSucesso("Ativado com sucesso!");
            this.lembreteService.NotificarEvento("start");
            this.onSubmitted.emit();
          },
          error: (error: HttpErrorResponse) => {
            this.mensagemService.addMensagemError(error.error);
          }
        });
      }
    }
    this.activeModal.dismiss();
  }

  ReturnCargoFuncionario(cargo: number) {
    switch (cargo) {
      case 0: return "Motorista";
      case 1: return "Assistente";
      case 2: return "Administrador";
    }
    return "Nenhum cargo encontrado!";
  }

  ReturnDateFuncionario(date: string) {
    const DateFormatada = this.datePipe.transform(date, "dd/MM/yyyy");
    return DateFormatada;
  }

  ReturnCpfFormatado(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
