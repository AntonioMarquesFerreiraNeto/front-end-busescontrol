import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { Funcionario } from 'src/app/Funcionario';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-gerir-funcionario',
  templateUrl: './gerir-funcionario.component.html',
  styleUrls: ['./gerir-funcionario.component.css']
})
export class GerirFuncionarioComponent implements OnInit {
  textStatus!: string;
  @Input() funcionario!: Funcionario;
  constructor(public activeModal: NgbActiveModal, private funcionarioService: FuncionarioService, private mensagemService: MensagensService, private compartilharService: CompartilharListService, private datePipe: DatePipe) {

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
            this.funcionarioService.GetPaginateAtivos(this.compartilharService.getPaginaAtualFuncionario(), true).subscribe((itens) => {
              this.compartilharService.atualizarFuncionario(itens.funciList);
              this.compartilharService.setTotPaginaFuncionario(itens.qtPaginate);
              this.mensagemService.addMensagemSucesso("Inativado com sucesso!");
            });
          },
          error: (error: HttpErrorResponse) => {
            this.mensagemService.addMensagemError(error.error);
          }
        });
      } else {
        this.funcionarioService.AtivarFuncionario(this.funcionario.id!).subscribe({
          next: () => {
            this.funcionarioService.GetPaginateInativos(this.compartilharService.getPaginaAtualFuncionario(), true).subscribe((itens) => {
              this.compartilharService.atualizarFuncionario(itens.funciList);
              this.compartilharService.setTotPaginaFuncionario(itens.qtPaginate);
              this.mensagemService.addMensagemSucesso("Ativado com sucesso!");
            });
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
