import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteJuridico } from 'src/app/interfaces/ClienteJuridico';
import { ClientePjService } from 'src/app/services/cliente-pj.service';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { GerirClientepjComponent } from './pages/gerir-clientepj/gerir-clientepj.component';
import { Title } from '@angular/platform-browser';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-cliente-juridico',
  templateUrl: './cliente-juridico.component.html',
  styleUrls: ['./cliente-juridico.component.css'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class ClienteJuridicoComponent implements OnInit {
  clienteList!: ClienteJuridico[];
  tituloPag = "Clientes jurídicos";
  inativosSelect = false;
  mensagem = "Carregando...";
  pesquisa = "";

  constructor(private clienteService: ClientePjService, public compartilhamento: CompartilharListService, private mensagemService: MensagensService, private modal: NgbModal, private titleService: Title) {
    this.titleService.setTitle("Buses Control - Clientes Jurídicos");
    this.validaResolucao();
  }

  ngOnInit(): void {
    this.tituloPag = "Clientes jurídicos";
    this.clienteService.GetClientesAtivos(this.compartilhamento.getPaginaAtualClientePj(), this.pesquisa).subscribe({
      next: (itens) => {
        if (!itens.clienteList.length) {
          this.mensagem = "Nenhum registro encontrado!";
        }
        this.clienteList = itens.clienteList;
        this.compartilhamento.setTotPaginaClientePj(itens.qtPaginas);
      },
      error: () => {
        this.mensagemService.addMensagemError("Desculpe, ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde ou entre em contato com o suporte do sistema.");
        this.mensagem = "Desculpe, ocorreu um erro ao processar a solicitação.";
      }
    });
    this.compartilhamento.clientePj$.subscribe((itens) => this.clienteList = itens);
  }

  GetAtivos() {
    this.inativosSelect = false;
    this.tituloPag = "Clientes jurídicos";
    this.compartilhamento.setPaginaAtualClientePj(1);
    this.clienteService.GetClientesAtivos(this.compartilhamento.getPaginaAtualClientePj(), this.pesquisa).subscribe((itens) => {
      this.clienteList = itens.clienteList;
      this.compartilhamento.setTotPaginaClientePj(itens.qtPaginas);
      if (!itens.clienteList.length) {
        this.mensagem = "Nenhum registro encontrado!";
      }
    });
  }
  GetInativos() {
    this.inativosSelect = true;
    this.tituloPag = "Clientes jurídicos";
    this.compartilhamento.setPaginaAtualClientePj(1);
    this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualClientePj(), this.pesquisa).subscribe((itens) => {
      this.clienteList = itens.clienteList;
      this.compartilhamento.setTotPaginaClientePj(itens.qtPaginas);
      if (!this.clienteList.length) {
        this.mensagem = "Nenhum registro encontrado!";
      }
    });
  }

  proximoInativosPaginate() {
    if (this.compartilhamento.getPaginaAtualClientePj() == this.compartilhamento.getTotPaginaClientePj()) {
      return;
    }
    this.compartilhamento.setPaginaAtualClientePj(this.compartilhamento.getPaginaAtualClientePj() + 1);
    this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualClientePj(), this.pesquisa).subscribe((itens) => {
      this.clienteList = itens.clienteList;
    });
  }
  proximoAtivosPaginate() {
    if (this.compartilhamento.getPaginaAtualClientePj() == this.compartilhamento.getTotPaginaClientePj()) {
      return;
    }
    this.compartilhamento.setPaginaAtualClientePj(this.compartilhamento.getPaginaAtualClientePj() + 1);
    this.clienteService.GetClientesAtivos(this.compartilhamento.getPaginaAtualClientePj(), this.pesquisa).subscribe((itens) => {
      this.clienteList = itens.clienteList;
    });
  }
  anteriorInativosPaginate() {
    if (this.compartilhamento.getPaginaAtualClientePj() == 1) {
      return;
    }
    this.compartilhamento.setPaginaAtualClientePj(this.compartilhamento.getPaginaAtualClientePj() - 1);
    this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualClientePj(), this.pesquisa).subscribe((itens) => {
      this.clienteList = itens.clienteList;
    });
  }
  anteriorAtivosPaginate() {
    if (this.compartilhamento.getPaginaAtualClientePj() == 1) {
      return;
    }
    this.compartilhamento.setPaginaAtualClientePj(this.compartilhamento.getPaginaAtualClientePj() - 1);
    this.clienteService.GetClientesAtivos(this.compartilhamento.getPaginaAtualClientePj(), this.pesquisa).subscribe((itens) => {
      this.clienteList = itens.clienteList;
    });
  }

  AbrirModalGerir(cliente: ClienteJuridico) {
    const modalOptions = {
      size: 'lg'
    };
    const modalRef = this.modal.open(GerirClientepjComponent, modalOptions);
    modalRef.componentInstance.cliente = cliente;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.AtualizarCliente();
    })
  }

  trueContratosEmAndamento(item: ClienteJuridico): boolean {
    const contratosEmAndamento = item.clientesContrato?.some(x => x.contrato?.andamento === 1);
    return (contratosEmAndamento) ? true : false;
  }

  returnAdimplencia(value: number) {
    switch (value) {
      case 0: return "Adimplente";
      case 1: return "Inadimplente";
      default: return "Não conseguimos processar.";
    }
  }

  returnCorAdimplencia(value: number) {
    if (value == 0) return "azul-borda";
    else return "roxo-borda"
  }

  Pesquisar(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pesquisa = input.value;
    this.compartilhamento.setPaginaAtualClientePj(1);
    if (!this.inativosSelect) {
      this.clienteService.GetClientesAtivos(this.compartilhamento.getPaginaAtualClientePj(), this.pesquisa).subscribe((itens) => {
        this.clienteList = itens.clienteList
        this.compartilhamento.setTotPaginaClientePj(itens.qtPaginas);
      })
    } else {
      this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualClientePj(), this.pesquisa).subscribe((itens) => {
        this.clienteList = itens.clienteList
        this.compartilhamento.setTotPaginaClientePj(itens.qtPaginas);
      })
    }
    if (!this.clienteList.length) this.mensagem = "Nenhum registro encontrado.";
  }

  AtualizarCliente() {
    if (!this.inativosSelect) {
      this.clienteService.GetClientesAtivos(this.compartilhamento.getPaginaAtualClientePj(), this.pesquisa).subscribe(x => {
        if (x.clienteList.length == 0 && this.compartilhamento.getPaginaAtualClientePj() > 1) {
          this.compartilhamento.setPaginaAtualClientePj(this.compartilhamento.getPaginaAtualClientePj() - 1);
          this.AtualizarCliente(); //Chamada recursiva.
        } else {
          this.clienteList = x.clienteList;
          this.compartilhamento.setTotPaginaClientePj(x.qtPaginas);
          if (!this.clienteList.length) this.mensagem = "Nenhum registro encontrado.";
        }
      });
    } else {
      this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualClientePj(), this.pesquisa).subscribe(x => {
        if (x.clienteList.length == 0 && this.compartilhamento.getPaginaAtualClientePj() > 1) {
          this.compartilhamento.setPaginaAtualClientePj(this.compartilhamento.getPaginaAtualClientePj() - 1);
          this.AtualizarCliente(); //Chamada recursiva.
        } else {
          this.clienteList = x.clienteList;
          this.compartilhamento.setTotPaginaClientePj(x.qtPaginas);
          if (!this.clienteList.length) this.mensagem = "Nenhum registro encontrado.";
        }
      });
    }
  }

  larguraMinima = false;
  @HostListener('window:resize', ['$event'])
  validaResolucao() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 960) {
      this.larguraMinima = true
    } else {
      this.larguraMinima = false;
    }
  }
}
