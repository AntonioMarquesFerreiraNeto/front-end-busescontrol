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
import { Title } from '@angular/platform-browser';

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
  pesquisa = "";
  pageNumber: number = 1;
  totPaginas: number = 1;
  filtro: number = 2;

  constructor(private fornecedorService: FornecedorServiceService,
    private mensagemService: MensagensService, private modal: NgbModal, private titleService: Title) {
      this.titleService.setTitle("Buses Control - Fornecedores");
      this.validaResolucao()
  }

  ngOnInit(): void {
    this.tituloPag = "Fornecedores";
    this.fornecedorService.GetAtivos(this.pageNumber, this.filtro, this.pesquisa).subscribe({
      next: (itens) => {
        this.fornecedores = itens.fornecedorList;
        this.totPaginas = itens.qtPaginas;
        if (!this.fornecedores.length) this.mensagem = "Nenhum registro encontrado!";
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
    this.inativosSelect = false;
    this.pageNumber = 1;
    this.totPaginas = 1;
    this.tituloPag = "Fornecedores";
    this.fornecedorService.GetAtivos(this.pageNumber, this.filtro, this.pesquisa).subscribe((itens) => {
      this.totPaginas = itens.qtPaginas;
      this.fornecedores = itens.fornecedorList;
      if (itens.fornecedorList.length == 0) this.mensagem = "Nenhum registro encontrado.";
    });
  }

  GetInativos() {
    this.inativosSelect = true;
    this.pageNumber = 1;
    this.totPaginas = 1;
    this.tituloPag = "Fornecedores";
    this.fornecedorService.GetInativos(this.pageNumber, this.filtro, this.pesquisa).subscribe((itens) => {
      this.totPaginas = itens.qtPaginas;
      this.fornecedores = itens.fornecedorList;
      if (itens.fornecedorList.length == 0) this.mensagem = "Nenhum registro encontrado.";
    });
  }

  proximoAtivosPaginate() {
    if (this.totPaginas <= this.pageNumber) {
      return;
    }
    this.pageNumber++;
    this.fornecedorService.GetAtivos(this.pageNumber, this.filtro, this.pesquisa).subscribe((itens) => {
      this.fornecedores = itens.fornecedorList;
      this.totPaginas = itens.qtPaginas;
    });
  }
  anteriorAtivosPaginate() {
    if (this.pageNumber == 1) {
      return;
    }
    this.pageNumber--;
    this.fornecedorService.GetAtivos(this.pageNumber, this.filtro, this.pesquisa).subscribe((itens) => {
      this.fornecedores = itens.fornecedorList;
      this.totPaginas = itens.qtPaginas;
    });
  }

  proximoInativosPaginate() {
    if (this.totPaginas <= this.pageNumber) {
      return;
    }
    this.pageNumber++;
    this.fornecedorService.GetInativos(this.pageNumber, this.filtro, this.pesquisa).subscribe((itens) => {
      this.fornecedores = itens.fornecedorList;
      this.totPaginas = itens.qtPaginas;
    });
  }
  anteriorInativosPaginate() {
    if (this.pageNumber == 1) {
      return;
    }
    this.pageNumber--;
    this.fornecedorService.GetInativos(this.pageNumber, this.filtro, this.pesquisa).subscribe((itens) => {
      this.fornecedores = itens.fornecedorList;
      this.totPaginas = itens.qtPaginas;
    });
  }

  AtualizarFornecedores() {
    if (!this.inativosSelect) {
      this.fornecedorService.GetAtivos(this.pageNumber, this.filtro, this.pesquisa).subscribe((itens) => {
        if (itens.fornecedorList.length == 0 && this.pageNumber > 1) {
          this.pageNumber = this.pageNumber - 1;
          this.AtualizarFornecedores();
        }
        else {
          this.fornecedores = itens.fornecedorList;
          this.totPaginas = itens.qtPaginas;
          if (this.fornecedores.length == 0) this.mensagem = "Nenhum registro encontrado."
        }
      });
    } else {
      this.fornecedorService.GetInativos(this.pageNumber, this.filtro, this.pesquisa).subscribe((itens) => {
        if (itens.fornecedorList.length == 0 && this.pageNumber > 1) {
          this.pageNumber = this.pageNumber - 1;
          this.AtualizarFornecedores();
        }
        else {
          this.fornecedores = itens.fornecedorList;
          this.totPaginas = itens.qtPaginas;
          if (this.fornecedores.length == 0) this.mensagem = "Nenhum registro encontrado."
        }
      });
    }
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
    const modalRef = this.modal.open(NewFornecedorComponent, modalOp);
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.AtualizarFornecedores();
    });
  }
  EditarFornecedor(item: Fornecedor) {
    const modalOp = {
      size: 'lg'
    };
    const modalRef = this.modal.open(EditFornecedorComponent, modalOp);
    modalRef.componentInstance.fornecedor = item;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.AtualizarFornecedores();
    });
  }
  GerirFornecedor(item: Fornecedor) {
    const modalOp = {
      size: 'lg'
    };
    const modalRef = this.modal.open(GerirFornecedorComponent, modalOp);
    modalRef.componentInstance.fornecedor = item;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.AtualizarFornecedores();
    });
  }

  Pesquisar(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pesquisa = input.value;
    this.pageNumber = 1;
    if (!this.inativosSelect) {
      this.fornecedorService.GetAtivos(this.pageNumber, this.filtro, this.pesquisa).subscribe({
        next: (itens) => {
          this.fornecedores = itens.fornecedorList;
          this.totPaginas = itens.qtPaginas;
          if (itens.fornecedorList.length == 0) this.mensagem = "Nenhum registro encontrado.";
        }
      });
    } else {
      this.fornecedorService.GetInativos(this.pageNumber, this.filtro, this.pesquisa).subscribe({
        next: (itens) => {
          this.fornecedores = itens.fornecedorList;
          this.totPaginas = itens.qtPaginas;
          if (itens.fornecedorList.length == 0) this.mensagem = "Nenhum registro encontrado.";
        }
      });
    }
  }

  Filtro(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pageNumber = 1;
    this.filtro = Number(input.value);
    if (!this.inativosSelect) {
      this.fornecedorService.GetAtivos(this.pageNumber, this.filtro, this.pesquisa).subscribe((x) => {
        this.fornecedores = x.fornecedorList;
        this.totPaginas = x.qtPaginas;
        if (this.fornecedores.length == 0) this.mensagem = "Nenhum registro encontrado!";
      });
    } else {
      this.fornecedorService.GetInativos(this.pageNumber, this.filtro, this.pesquisa).subscribe((x) => {
        this.fornecedores = x.fornecedorList;
        this.totPaginas = x.qtPaginas;
        if (this.fornecedores.length == 0) this.mensagem = "Nenhum registro encontrado!";
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
