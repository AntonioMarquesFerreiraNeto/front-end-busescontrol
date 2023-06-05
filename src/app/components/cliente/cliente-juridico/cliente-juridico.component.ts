import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteJuridico } from 'src/app/interfaces/ClienteJuridico';
import { ClientePjService } from 'src/app/services/cliente-pj.service';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { GerirClientepjComponent } from './pages/gerir-clientepj/gerir-clientepj.component';

@Component({
  selector: 'app-cliente-juridico',
  templateUrl: './cliente-juridico.component.html',
  styleUrls: ['./cliente-juridico.component.css']
})
export class ClienteJuridicoComponent implements OnInit {
  clienteList!: ClienteJuridico[];
  tituloPag = "Clientes jurídicos";
  inativosSelect = false;
  mensagem = "Carregando..."
  constructor(private clienteService: ClientePjService, public compartilhamento: CompartilharListService, private mensagemService: MensagensService, private modal: NgbModal) {
    this.validaResolucao();
  }

  ngOnInit(): void {
    this.tituloPag = "Clientes jurídicos ativos";
    this.clienteService.GetClientesAtivos(this.compartilhamento.getPaginaAtualClientePj(), true).subscribe({
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
    this.tituloPag = "Clientes jurídicos ativos";
    this.compartilhamento.setPaginaAtualClientePj(1);
    this.clienteService.GetClientesAtivos(this.compartilhamento.getPaginaAtualClientePj(), true).subscribe((itens) => {
      this.clienteList = itens.clienteList;
      this.compartilhamento.setTotPaginaClientePj(itens.qtPaginas);
      if(!itens.clienteList.length){
        this.mensagem = "Nenhum registro encontrado!";
      }
    });
  }
  GetInativos() {
    this.inativosSelect = true;
    this.tituloPag = "Clientes jurídicos inativos";
    this.compartilhamento.setPaginaAtualClientePj(1);
    this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualClientePj(), true).subscribe((itens) =>{
      this.clienteList = itens.clienteList;
      this.compartilhamento.setTotPaginaClientePj(itens.qtPaginas);
      if(!this.clienteList.length){
        this.mensagem = "Nenhum registro encontrado!";
      }
    });
  }

  proximoInativosPaginate() {
    if(this.compartilhamento.getPaginaAtualClientePj() == this.compartilhamento.getTotPaginaClientePj()){
      return;
    }
    this.compartilhamento.setPaginaAtualClientePj(this.compartilhamento.getPaginaAtualClientePj() + 1);
    this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualClientePj(), true).subscribe((itens) =>{
      this.clienteList = itens.clienteList;
    });
  }
  proximoAtivosPaginate() {
    if(this.compartilhamento.getPaginaAtualClientePj() == this.compartilhamento.getTotPaginaClientePj()){
      return;
    }
    this.compartilhamento.setPaginaAtualClientePj(this.compartilhamento.getPaginaAtualClientePj() + 1);
    this.clienteService.GetClientesAtivos(this.compartilhamento.getPaginaAtualClientePj(), true).subscribe((itens) =>{
      this.clienteList = itens.clienteList;
    });
  }
  anteriorInativosPaginate() {
    if(this.compartilhamento.getPaginaAtualClientePj() == 1){
      return;
    }
    this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualClientePj(), false).subscribe((itens) =>{
      this.clienteList = itens.clienteList;
      this.compartilhamento.setPaginaAtualClientePj(this.compartilhamento.getPaginaAtualClientePj() -1);
    });
  }
  anteriorAtivosPaginate() {
    if(this.compartilhamento.getPaginaAtualClientePj() == 1){
      return;
    }
    this.clienteService.GetClientesAtivos(this.compartilhamento.getPaginaAtualClientePj(), false).subscribe((itens) =>{
      this.clienteList = itens.clienteList;
      this.compartilhamento.setPaginaAtualClientePj(this.compartilhamento.getPaginaAtualClientePj() -1);
    });
  }

  AbrirModalGerir(cliente: ClienteJuridico){
    const modalOptions = {
      size: 'lg'
    };
    const modalRef = this.modal.open(GerirClientepjComponent, modalOptions);
    modalRef.componentInstance.cliente = cliente;
  }

  larguraMinima = false;
  @HostListener('window:resize', ['$event'])
  validaResolucao() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 960) {
      this.larguraMinima = true
    }
  }
}
