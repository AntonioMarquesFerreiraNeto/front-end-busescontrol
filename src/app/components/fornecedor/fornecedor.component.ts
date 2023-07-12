import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Fornecedor } from 'src/app/interfaces/Fornecedor';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { FornecedorServiceService } from 'src/app/services/fornecedor-service.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { NewFornecedorComponent } from './pages/new-fornecedor/new-fornecedor.component';
import { EditFornecedorComponent } from './pages/edit-fornecedor/edit-fornecedor.component';
import { GerirFornecedorComponent } from './pages/gerir-fornecedor/gerir-fornecedor.component';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {

  mensagem: string = "Carregando...";
  tituloPag = "Fornecedores";
  inativosSelect = false;
  fornecedores: Fornecedor[] = [];

  constructor(public compartilhamento: CompartilharListService, private fornecedorService: FornecedorServiceService,
    private mensagemService: MensagensService, private modal: NgbModal) {

  }

  ngOnInit(): void {
    this.tituloPag = "Fornecedores ativos";
    this.fornecedorService.GetAtivos(this.compartilhamento.getPaginaAtualFornecedor(), true).subscribe({
      next: (itens) => {
        this.fornecedores = itens.fornecedorList;
        this.compartilhamento.setTotPaginaFornecedor(itens.qtPaginas);
        if (!this.fornecedores.length) this.mensagem = "Nenhum registro encontrado!";
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.mensagemService.addMensagemError("Desculpe, ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde ou entre em contato com o suporte do sistema.");
          this.mensagem = "Desculpe, ocorreu um erro ao processar a solicitação.";
        }
      }
    });
    this.compartilhamento.fornecedores$.subscribe((list) => {
      if (!this.fornecedores.length) this.mensagem = "Nenhum registro encontrado!";
      this.fornecedores = list;
    });
  }

  GetAtivos() {
    this.inativosSelect = false;
    this.tituloPag = "Fornecedores ativos";
    this.fornecedorService.GetAtivos(1, true).subscribe((itens) => {
      this.compartilhamento.setPaginaAtualFornecedor(1);
      this.compartilhamento.setTotPaginaFornecedor(itens.qtPaginas);
      this.fornecedores = itens.fornecedorList;
    });
  }

  GetInativos() {
    this.inativosSelect = true;
    this.tituloPag = "Fornecedores inativos";
    this.fornecedorService.GetInativos(1, true).subscribe((itens) => {
      this.compartilhamento.setPaginaAtualFornecedor(1);
      this.compartilhamento.setTotPaginaFornecedor(itens.qtPaginas);
      this.fornecedores = itens.fornecedorList;
    });
  }

  proximoAtivosPaginate() {
    if(this.compartilhamento.getPaginaAtualFornecedor() == this.compartilhamento.getTotPaginaFornecedor()){
      return;
    }
    this.compartilhamento.setPaginaAtualFornecedor(this.compartilhamento.getPaginaAtualFornecedor() + 1);
    this.fornecedorService.GetAtivos(this.compartilhamento.getPaginaAtualFornecedor(), true).subscribe((itens) =>{
      this.fornecedores = itens.fornecedorList;
      this.compartilhamento.setTotPaginaFornecedor(itens.qtPaginas);
    });
  }
  anteriorAtivosPaginate() {
    if(this.compartilhamento.getPaginaAtualFornecedor() == 1){
      return;
    }
    this.fornecedorService.GetAtivos(this.compartilhamento.getPaginaAtualFornecedor(), false).subscribe((itens) =>{
      this.fornecedores = itens.fornecedorList;
      this.compartilhamento.setTotPaginaFornecedor(itens.qtPaginas)
      this.compartilhamento.setPaginaAtualFornecedor(this.compartilhamento.getPaginaAtualFornecedor() -1);
    });
  }

  proximoInativosPaginate() {
    if(this.compartilhamento.getPaginaAtualFornecedor() == this.compartilhamento.getTotPaginaFornecedor()){
      return;
    }
    this.compartilhamento.setPaginaAtualFornecedor(this.compartilhamento.getPaginaAtualFornecedor() + 1);
    this.fornecedorService.GetInativos(this.compartilhamento.getPaginaAtualFornecedor(), true).subscribe((itens) =>{
      this.fornecedores = itens.fornecedorList;
      this.compartilhamento.setTotPaginaFornecedor(itens.qtPaginas);
    });
  }
  anteriorInativosPaginate() {
    if(this.compartilhamento.getPaginaAtualFornecedor() == 1){
      return;
    }
    this.fornecedorService.GetInativos(this.compartilhamento.getPaginaAtualFornecedor(), false).subscribe((itens) =>{
      this.fornecedores = itens.fornecedorList;
      this.compartilhamento.setTotPaginaFornecedor(itens.qtPaginas)
      this.compartilhamento.setPaginaAtualFornecedor(this.compartilhamento.getPaginaAtualFornecedor() -1);
    });
  }

  ReturnTypeFornecedor(type: number) {
    if (type == 0) {
      return "Pessoa física"
    }
    return "Pessoa jurídica"
  }
  ReturnCorFornecedor(type: number) {
    if (type == 0) {
      return "azul-borda"
    }
    return "roxo-borda"
  }


  AdicionarFornecedor() {
    const modalOp = {
      size: 'lg'
    };
    this.modal.open(NewFornecedorComponent, modalOp);
  }
  EditarFornecedor(item: Fornecedor) {
    const modalOp = {
      size: 'lg'
    };
    const modalRef = this.modal.open(EditFornecedorComponent, modalOp);
    modalRef.componentInstance.fornecedor = item;
  }
  GerirFornecedor(item: Fornecedor) {
    const modalOp = {
      size: 'lg'
    };
    const modalRef = this.modal.open(GerirFornecedorComponent, modalOp);
    modalRef.componentInstance.fornecedor = item;
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
