import { Component, OnInit, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteFisico } from 'src/app/interfaces/ClienteFisico';
import { ClienteService } from 'src/app/services/cliente.service';
import { GerirClienteComponent } from './pages/gerir-cliente/gerir-cliente.component';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MensagensService } from 'src/app/services/mensagens.service';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class ClienteComponent implements OnInit {
  tituloPag = "Clientes";
  inativosSelect = false;
  pesquisa = "";
  clienteList: ClienteFisico[] = [];
  mensagem = "Carregando...";

  constructor(private clienteService: ClienteService, private modal: NgbModal, public compartilhamento: CompartilharListService, private mensagemService: MensagensService, private datePipe: DatePipe, private titleService: Title) {
    this.titleService.setTitle("Buses Control - Clientes");
    this.validaResolucao();
  }

  ngOnInit(): void {
    this.tituloPag = "Clientes físicos";
    this.clienteService.GetClientes(this.compartilhamento.getPaginaAtualCliente(), this.pesquisa).subscribe({
      next: (itens) => {
        this.clienteList = itens.clienteList;
        this.compartilhamento.setTotPaginaCliente(itens.qtPaginas);
        if (!this.clienteList.length) this.mensagem = "Nenhum registro encontrado!";
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.mensagemService.addMensagemError("Desculpe, ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde ou entre em contato com o suporte do sistema.");
          this.mensagem = "Desculpe, ocorreu um erro ao processar a solicitação.";
        }
      }
    });
  }

  GetAtivos() {
    this.tituloPag = "Clientes físicos";
    this.inativosSelect = false;
    this.clienteService.GetClientes(this.compartilhamento.getPaginaAtualCliente(), this.pesquisa).subscribe((itens) => {
      this.clienteList = itens.clienteList;
      this.compartilhamento.setTotPaginaCliente(itens.qtPaginas);
    });
  }
  GetInativos() {
    this.tituloPag = "Clientes físicos";
    this.inativosSelect = true;
    this.compartilhamento.setPaginaAtualCliente(1);
    this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualCliente(), this.pesquisa).subscribe((itens) => {
      this.clienteList = itens.clienteList;
      this.compartilhamento.setTotPaginaCliente(itens.qtPaginas);
      if (!this.clienteList.length) this.mensagem = "Nenhum registro encontrado!"
    });
  }

  proximoAtivosPaginate() {
    if (this.compartilhamento.getPaginaAtualCliente() == this.compartilhamento.getTotPaginaCliente()) {
      return;
    }
    this.compartilhamento.setPaginaAtualCliente(this.compartilhamento.getPaginaAtualCliente() + 1);
    this.clienteService.GetClientes(this.compartilhamento.getPaginaAtualCliente(), this.pesquisa).subscribe((itens) => {
      this.clienteList = itens.clienteList;
      this.compartilhamento.setTotPaginaCliente(itens.qtPaginas);
    });
  }
  anteriorAtivosPaginate() {
    if (this.compartilhamento.getPaginaAtualCliente() == 1) {
      return;
    }
    this.compartilhamento.setPaginaAtualCliente(this.compartilhamento.getPaginaAtualCliente() - 1);
    this.clienteService.GetClientes(this.compartilhamento.getPaginaAtualCliente(), this.pesquisa).subscribe((itens) => {
      this.clienteList = itens.clienteList;
      this.compartilhamento.setTotPaginaCliente(itens.qtPaginas);
    });
  }
  proximoInativosPaginate() {
    if (this.compartilhamento.getPaginaAtualCliente() == this.compartilhamento.getTotPaginaCliente()) {
      return;
    }
    this.compartilhamento.setPaginaAtualCliente(this.compartilhamento.getPaginaAtualCliente() + 1);
    this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualCliente(), this.pesquisa).subscribe((itens) => {
      this.clienteList = itens.clienteList;
      this.compartilhamento.setTotPaginaCliente(itens.qtPaginas);
    });
  }
  anteriorInativosPaginate() {
    if (this.compartilhamento.getPaginaAtualCliente() == 1) {
      return;
    }
    this.compartilhamento.setPaginaAtualCliente(this.compartilhamento.getPaginaAtualCliente() - 1);
    this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualCliente(), this.pesquisa).subscribe((itens) => {
      this.clienteList = itens.clienteList;
      this.compartilhamento.setTotPaginaCliente(itens.qtPaginas);
    });
  }

  AbrirModalGerir(cliente: ClienteFisico) {
    const modalOptions = {
      size: 'lg'
    }
    const modalRef = this.modal.open(GerirClienteComponent, modalOptions);
    modalRef.componentInstance.cliente = cliente;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.AtualizarCliente();
    });
  }

  trueContratosEmAndamento(item: ClienteFisico): boolean {
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
    this.compartilhamento.setPaginaAtualCliente(1);
    if (!this.inativosSelect) {
      this.clienteService.GetClientes(this.compartilhamento.getPaginaAtualCliente(), this.pesquisa).subscribe(x => {
        this.clienteList = x.clienteList;
        this.compartilhamento.setTotPaginaCliente(x.qtPaginas);
      });
    } else {
      this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualCliente(), this.pesquisa).subscribe(x => {
        this.clienteList = x.clienteList;
        this.compartilhamento.setTotPaginaCliente(x.qtPaginas);
      });
    }
    if(!this.clienteList.length) this.mensagem = "Nenhum registro encontrado.";
  }

  AtualizarCliente() {
    if (!this.inativosSelect) {
      this.clienteService.GetClientes(this.compartilhamento.getPaginaAtualCliente(), this.pesquisa).subscribe(itens => {
        if (itens.clienteList.length == 0 && this.compartilhamento.getPaginaAtualCliente() > 1) {
          this.compartilhamento.setPaginaAtualCliente(this.compartilhamento.getPaginaAtualCliente() - 1);
          this.AtualizarCliente();
        } else {
          this.clienteList = itens.clienteList;
          this.compartilhamento.setTotPaginaCliente(itens.qtPaginas);
          if (!this.clienteList.length) this.mensagem = "Nenhum registro encontrado."
        }
      });
    } else {
      this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualCliente(), this.pesquisa).subscribe(itens => {
        if (itens.clienteList.length == 0 && this.compartilhamento.getPaginaAtualCliente() > 1) {
          this.compartilhamento.setPaginaAtualCliente(this.compartilhamento.getPaginaAtualCliente() - 1);
          this.AtualizarCliente();
        } else {
          this.clienteList = itens.clienteList;
          this.compartilhamento.setTotPaginaCliente(itens.qtPaginas);
          if (!this.clienteList.length) this.mensagem = "Nenhum registro encontrado."
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
