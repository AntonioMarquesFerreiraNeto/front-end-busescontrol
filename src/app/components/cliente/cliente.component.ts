import { Component, OnInit, HostListener } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ClienteFisico } from 'src/app/interfaces/ClienteFisico';
import { ClienteService } from 'src/app/services/cliente.service';
import { GerirClienteComponent } from './pages/gerir-cliente/gerir-cliente.component';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MensagensService } from 'src/app/services/mensagens.service';
import { Contrato } from 'src/app/interfaces/Contrato';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  tituloPag = "Clientes";
  inativosSelect = false;
  clienteList!: ClienteFisico[];
  mensagem = "Carregando...";

  constructor(private clienteService: ClienteService, private modal: NgbModal, public compartilhamento: CompartilharListService, private mensagemService: MensagensService) {
    this.validaResolucao();
  }

  ngOnInit(): void {
    this.tituloPag = "Clientes físicos ativos";
    this.clienteService.GetClientes(this.compartilhamento.getPaginaAtualCliente(), true).subscribe({
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
    this.compartilhamento.cliente$.subscribe((list) => {
      this.clienteList = list;
    });
  }

  GetAtivos() {
    this.tituloPag = "Clientes físicos ativos";
    this.inativosSelect = false;
    this.clienteService.GetClientes(this.compartilhamento.getPaginaAtualCliente(), true).subscribe((itens) => {
      this.clienteList = itens.clienteList;
      this.compartilhamento.setTotPaginaCliente(itens.qtPaginas);
    });
  }
  GetInativos() {
    this.tituloPag = "Clientes físicos inativos";
    this.inativosSelect = true;
    this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualCliente(), true).subscribe((itens) => {
      this.clienteList = itens.clienteList;
      this.compartilhamento.setTotPaginaCliente(itens.qtPaginas);
      if (!this.clienteList.length) this.mensagem = "Nenhum registro encontrado!"
    });
  }

  proximoAtivosPaginate(){
    if(this.compartilhamento.getPaginaAtualCliente() == this.compartilhamento.getTotPaginaCliente()){
      return;
    }
    this.clienteService.GetClientes(this.compartilhamento.getPaginaAtualCliente() + 1, true).subscribe((itens) => {
      this.clienteList = itens.clienteList;
      this.compartilhamento.setPaginaAtualCliente(this.compartilhamento.getPaginaAtualCliente() + 1);
      this.compartilhamento.setTotPaginaCliente(itens.qtPaginas);
    });
  }
  anteriorAtivosPaginate(){
    if(this.compartilhamento.getPaginaAtualCliente() == 1){
      return;
    }
    this.clienteService.GetClientes(this.compartilhamento.getPaginaAtualCliente(), false).subscribe((itens) => {
      this.clienteList = itens.clienteList;
      this.compartilhamento.setPaginaAtualCliente(this.compartilhamento.getPaginaAtualCliente() -1);
      this.compartilhamento.setTotPaginaCliente(itens.qtPaginas);
    });
  }
  proximoInativosPaginate(){
    if(this.compartilhamento.getPaginaAtualCliente() == this.compartilhamento.getTotPaginaCliente()){
      return;
    }
    this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualCliente() + 1, true).subscribe((itens) =>{
      this.clienteList = itens.clienteList;
      this.compartilhamento.setPaginaAtualCliente(this.compartilhamento.getPaginaAtualCliente() + 1);
      this.compartilhamento.setTotPaginaCliente(itens.qtPaginas);
    });
  }
  anteriorInativosPaginate(){
    if(this.compartilhamento.getPaginaAtualCliente() == 1){
      return;
    }
    this.clienteService.GetClientesInativos(this.compartilhamento.getPaginaAtualCliente(), false).subscribe((itens) =>{
      this.clienteList = itens.clienteList;
      this.compartilhamento.setPaginaAtualCliente(this.compartilhamento.getPaginaAtualCliente() - 1);
      this.compartilhamento.setTotPaginaCliente(itens.qtPaginas);
    });
  }


  AbrirModalGerir(cliente: ClienteFisico) {
    const modalOptions = {
      size: 'lg'
    }
    const modalRef = this.modal.open(GerirClienteComponent, modalOptions);
    modalRef.componentInstance.cliente = cliente;
  }

  trueContratosEmAndamento(item: ClienteFisico): boolean{
    const contratosEmAndamento = item.clientesContrato?.some(x => x.contrato?.andamento === 1);
    return (contratosEmAndamento) ? true : false;
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
