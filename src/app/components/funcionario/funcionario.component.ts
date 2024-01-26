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
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  funcionarioList: Funcionario[] = [];
  tituloPag: string = "Funcionários";
  inativosSelect = false;
  pesquisa = "";
  mensagem: string = "Carregando...";

  constructor(public compartilhamento: CompartilharListService, private funcionarioService: FuncionarioService, private mensagemService: MensagensService, private modalService: NgbModal, private titleService: Title) {
    this.titleService.setTitle("Buses Control - Funcionários");
    this.validaResolucao();
  }
  ngOnInit(): void {
    this.funcionarioService.GetPaginateAtivos(this.compartilhamento.getPaginaAtualFuncionario(), this.pesquisa).subscribe({
      next: (itens) => {
        this.funcionarioList = itens.funciList;
        if (!this.funcionarioList.length) {
          this.mensagem = "Nenhum registro encontrado.";
        }
        this.compartilhamento.setTotPaginaFuncionario(itens.qtPaginate);
        this.tituloPag = "Funcionários"
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.mensagemService.addMensagemError("Desculpe, ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde ou entre em contato com o suporte do sistema.");
          this.mensagem = "Desculpe, ocorreu um erro ao processar a solicitação.";
        }
      }
    });
  }

  listAtivos() {
    this.compartilhamento.setPaginaAtualFuncionario(1);
    this.tituloPag = "Funcionários";
    this.inativosSelect = false;
    this.funcionarioService.GetPaginateAtivos(this.compartilhamento.getPaginaAtualFuncionario(), this.pesquisa).subscribe((itens) => {
      this.funcionarioList = itens.funciList;
      this.compartilhamento.setTotPaginaFuncionario(itens.qtPaginate);
    });
  }
  listInativos() {
    this.compartilhamento.setPaginaAtualFuncionario(1);
    this.tituloPag = "Funcionários";
    this.inativosSelect = true;
    this.funcionarioService.GetPaginateInativos(this.compartilhamento.getPaginaAtualFuncionario(), this.pesquisa).subscribe((itens) => {
      if (!itens.funciList.length) {
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
    this.funcionarioService.GetPaginateAtivos(this.compartilhamento.getPaginaAtualFuncionario(), this.pesquisa).subscribe((itens) => {
      this.funcionarioList = itens.funciList;
    });
  }
  anteriorAtivosPaginate() {
    if (this.compartilhamento.getPaginaAtualFuncionario() == 1) {
      return;
    }
    this.compartilhamento.setPaginaAtualFuncionario(this.compartilhamento.getPaginaAtualFuncionario() - 1);
    this.funcionarioService.GetPaginateAtivos(this.compartilhamento.getPaginaAtualFuncionario(), this.pesquisa).subscribe((itens) => {
      this.funcionarioList = itens.funciList;
    });
  }

  proximoInativosPaginate() {
    if (this.compartilhamento.getPaginaAtualFuncionario() == this.compartilhamento.getTotPaginaFuncionario()) {
      return;
    }
    this.compartilhamento.setPaginaAtualFuncionario(this.compartilhamento.getPaginaAtualFuncionario() + 1);
    this.funcionarioService.GetPaginateInativos(this.compartilhamento.getPaginaAtualFuncionario(), this.pesquisa).subscribe((itens) => {
      this.funcionarioList = itens.funciList;
    });
  }
  anteriorInativosPaginate() {
    if (this.compartilhamento.getPaginaAtualFuncionario() == 1) {
      return;
    }
    this.compartilhamento.setPaginaAtualFuncionario(this.compartilhamento.getPaginaAtualFuncionario() - 1);
    this.funcionarioService.GetPaginateInativos(this.compartilhamento.getPaginaAtualFuncionario(), this.pesquisa).subscribe((itens) => {
      this.funcionarioList = itens.funciList;
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
  ReturnCorCargo(cargo: number) {
    switch (cargo) {
      case 0: return "azul-borda";
      case 1: return "roxo-borda";
      case 2: return "verde-borda";
    }
    return "";
  }


  ModalGerirFuncionario(funcionario: Funcionario) {
    const NgbModalOptions = {
      size: 'lg'
    }
    const modalRef = this.modalService.open(GerirFuncionarioComponent, NgbModalOptions);
    modalRef.componentInstance.funcionario = funcionario;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.AtualizarListFuncionarios();
    });
  }

  ModalGerirUsuario(funcionario: Funcionario) {
    const modalOptions = {
      size: 'md'
    }
    const modalRef = this.modalService.open(GerirUsuarioComponent, modalOptions);
    modalRef.componentInstance.usuario = funcionario;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.AtualizarListFuncionarios();
    });
  }

  AtualizarListFuncionarios() {
    const paginaAtual = this.compartilhamento.getPaginaAtualFuncionario();
    if (!this.inativosSelect) {
      this.funcionarioService.GetPaginateAtivos(paginaAtual, this.pesquisa).subscribe(x => {
        if (paginaAtual > 1 && x.funciList.length == 0) {
          this.compartilhamento.setPaginaAtualFuncionario(paginaAtual - 1);
          this.AtualizarListFuncionarios();
        } else {
          this.funcionarioList = x.funciList;
          this.compartilhamento.setTotPaginaFuncionario(x.qtPaginate);
        }
      });
    } else {
      this.funcionarioService.GetPaginateInativos(paginaAtual, this.pesquisa).subscribe(x => {
        if (paginaAtual > 1 && x.funciList.length == 0) {
          this.compartilhamento.setPaginaAtualFuncionario(paginaAtual - 1);
          this.AtualizarListFuncionarios();
        } else {
          this.funcionarioList = x.funciList;
          this.compartilhamento.setTotPaginaFuncionario(x.qtPaginate);
        }
      });
    }
    if(this.funcionarioList.length == 0) this.mensagem = "Nenhum registro encontrado!"
  }

  Pesquisa(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pesquisa = input.value;
    this.compartilhamento.setPaginaAtualFuncionario(1);
    if (!this.inativosSelect) {
      this.funcionarioService.GetPaginateAtivos(this.compartilhamento.getPaginaAtualFuncionario(), this.pesquisa).subscribe(x => {
        this.funcionarioList = x.funciList;
        this.compartilhamento.setTotPaginaFuncionario(x.qtPaginate);
      });
    } else {
      this.funcionarioService.GetPaginateInativos(this.compartilhamento.getPaginaAtualFuncionario(), this.pesquisa).subscribe(x => {
        this.funcionarioList = x.funciList;
        this.compartilhamento.setTotPaginaFuncionario(x.qtPaginate);
      });
    }
    if (this.funcionarioList.length == 0) {
      this.mensagem = "Nenhum registro encontrado!";
    }
  }

  larguraMinima = false;
  @HostListener('window:resize', ['$event'])
  validaResolucao() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 800) {
      this.larguraMinima = true
    } else {
      this.larguraMinima = false;
    }
  }

}
