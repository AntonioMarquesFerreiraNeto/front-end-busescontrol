import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { combineAll } from 'rxjs';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GerirFuncionarioComponent } from './pages/gerir-funcionario/gerir-funcionario.component';
import { GerirUsuarioComponent } from './pages/gerir-usuario/gerir-usuario.component';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  funcionarioList!: Funcionario[];
  tituloPag: string = "Funcionários";
  inativosSelect = false;
  mensagem: string = "Carregando...";

  constructor(public compartilhamento: CompartilharListService, private funcionarioService: FuncionarioService, private mensagemService: MensagensService, private modalService: NgbModal) {
    this.validaResolucao();
  }
  ngOnInit(): void {
    this.funcionarioService.GetPaginateAtivos(this.compartilhamento.getPaginaAtualFuncionario(), true).subscribe({
      next: (itens) => {
        this.funcionarioList = itens.funciList;
        if (!this.funcionarioList.length) {
          this.mensagem = "Nenhum registro encontrado.";
        }
        this.compartilhamento.setTotPaginaFuncionario(itens.qtPaginate);
        this.tituloPag = "Funcionários ativos"
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.mensagemService.addMensagemError("Desculpe, ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde ou entre em contato com o suporte do sistema.");
          this.mensagem = "Desculpe, ocorreu um erro ao processar a solicitação.";
        }
      }
    });
    this.compartilhamento.funcionario$.subscribe((list) => {
      this.funcionarioList = list;
    })
  }

  listAtivos() {
    this.compartilhamento.setPaginaAtualFuncionario(1);
    this.tituloPag = "Funcionários ativos";
    this.inativosSelect = false;
    this.funcionarioService.GetPaginateAtivos(this.compartilhamento.getPaginaAtualFuncionario(), true).subscribe((itens) => {
      this.funcionarioList = itens.funciList;
      this.compartilhamento.setTotPaginaFuncionario(itens.qtPaginate);
    });
  }
  listInativos() {
    this.compartilhamento.setPaginaAtualFuncionario(1);
    this.tituloPag = "Funcionários inativos";
    this.inativosSelect = true;
    this.funcionarioService.GetPaginateInativos(this.compartilhamento.getPaginaAtualFuncionario(), true).subscribe((itens) => {
      if(!itens.funciList.length){
        this.mensagem = "Nenhum registro encontrado."
      }
      this.funcionarioList = itens.funciList;
      this.compartilhamento.setTotPaginaFuncionario(itens.qtPaginate);
    });
  }
  proximoAtivosPaginate() {
    if (this.compartilhamento.getPaginaAtualFuncionario() == this.compartilhamento.getTotPaginaFuncionario()) {
      return;
    }
    this.compartilhamento.setPaginaAtualFuncionario(this.compartilhamento.getPaginaAtualFuncionario() + 1);
    this.funcionarioService.GetPaginateAtivos(this.compartilhamento.getPaginaAtualFuncionario(), true).subscribe((itens) => {
      this.funcionarioList = itens.funciList;
    });
  }
  anteriorAtivosPaginate() {
    if (this.compartilhamento.getPaginaAtualFuncionario() == 1) {
      return;
    }
    this.funcionarioService.GetPaginateAtivos(this.compartilhamento.getPaginaAtualFuncionario(), false).subscribe((itens) => {
      this.funcionarioList = itens.funciList;
      this.compartilhamento.setPaginaAtualFuncionario(this.compartilhamento.getPaginaAtualFuncionario() - 1);
    });
  }

  proximoInativosPaginate() {
    if (this.compartilhamento.getPaginaAtualFuncionario() == this.compartilhamento.getTotPaginaFuncionario()) {
      return;
    }
    this.compartilhamento.setPaginaAtualFuncionario(this.compartilhamento.getPaginaAtualFuncionario() + 1);
    this.funcionarioService.GetPaginateInativos(this.compartilhamento.getPaginaAtualFuncionario(), true).subscribe((itens) => {
      this.funcionarioList = itens.funciList;
    });
  }
  anteriorInativosPaginate() {
    if (this.compartilhamento.getPaginaAtualFuncionario() == 1) {
      return;
    }
    this.funcionarioService.GetPaginateInativos(this.compartilhamento.getPaginaAtualFuncionario(), false).subscribe((itens) => {
      this.funcionarioList = itens.funciList;
      this.compartilhamento.setPaginaAtualFuncionario(this.compartilhamento.getPaginaAtualFuncionario() - 1);
    });
  }

  ReturnCargoFuncionario(cargo: number) {
    switch (cargo) {
      case 0: return "Motorista";
      case 1: return "Assistente";
      case 2: return "Administrador";
    }
    return "Cargo não encontrado";
  }


  ModalGerirFuncionario(funcionario: Funcionario){
    const NgbModalOptions = {
      size: 'lg'
    }
    const modalRef = this.modalService.open(GerirFuncionarioComponent, NgbModalOptions);
    modalRef.componentInstance.funcionario = funcionario;
  }

  ModalGerirUsuario(funcionario: Funcionario){
    const modalOptions = {
      size: 'md'
    }
    const modalRef = this.modalService.open(GerirUsuarioComponent, modalOptions);
    modalRef.componentInstance.usuario = funcionario;
  }
  
  larguraMinima = false;
  @HostListener('window:resize', ['$event'])
  validaResolucao() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
      this.larguraMinima = true
    }
  }

}
