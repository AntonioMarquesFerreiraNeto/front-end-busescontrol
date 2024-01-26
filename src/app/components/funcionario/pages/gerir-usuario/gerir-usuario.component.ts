import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-gerir-usuario',
  templateUrl: './gerir-usuario.component.html',
  styleUrls: ['./gerir-usuario.component.css']
})
export class GerirUsuarioComponent implements OnInit {
  @Input() usuario!: Funcionario;
  textStatus!: string;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  constructor(public activeModal: NgbActiveModal, private datePipe: DatePipe, private funcionarioService: FuncionarioService, private compartilhamento: CompartilharListService,
    private mensagemService: MensagensService) { }

  ngOnInit(): void {
    if (this.usuario.statusUsuario == 0) {
      this.textStatus = "ativar";
    } else {
      this.textStatus = "inativar";
    }
  }

  ActionHandler() {
    if (this.usuario.statusUsuario == 1) {
      this.funcionarioService.InativarUsuario(this.usuario.id!).subscribe({
        next: () => {
          this.mensagemService.addMensagemSucesso("Usuário inativado com sucesso!");
          this.onSubmitted.emit();
        },
        error: (error: HttpErrorResponse) => {
          this.mensagemService.addMensagemError(error.error);
        }
      });
    } else {
      this.funcionarioService.AtivarUsuario(this.usuario.id!).subscribe({
        next: () => {
          this.mensagemService.addMensagemSucesso("Usuário ativado com sucesso!");
          this.onSubmitted.emit();
        },
        error: (error: HttpErrorResponse) => {
          this.mensagemService.addMensagemError(error.error);
        }
      });
    }
    this.activeModal.dismiss();
  }

  ReturnCargoFuncionario(cargo: number) {
    switch (cargo) {
      case 0: return "Motorista";
      case 1: return "Assistente";
      case 2: return "Administrador"
    }
    return "Nenhum cargo encontrado!";
  }
  ReturnDateFuncionario(date: string) {
    const dateFormatada = this.datePipe.transform(date, "dd/MM/yyyy");
    return dateFormatada;
  }
  ReturnCpfFormatado(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
