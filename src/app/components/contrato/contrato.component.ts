import { DatePipe } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contrato } from 'src/app/interfaces/Contrato';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { AprovacaoContratoComponent } from './pages/aprovacao-contrato/aprovacao-contrato.component';
import { ViewClientescontratoComponent } from './pages/view-clientescontrato/view-clientescontrato.component';
import { GerirPdfComponent } from './pages/gerir-pdf/gerir-pdf.component';
import { GerirContratoComponent } from './pages/gerir-contrato/gerir-contrato.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Usuario } from 'src/app/interfaces/User';
import { Title } from '@angular/platform-browser';
import { SubstituicoesComponent } from './pages/substituicoes/substituicoes.component';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})

export class ContratoComponent implements OnInit {
  inativosSelect = false;
  tituloPag = "Contratos";
  contratoList: Contrato[] = [];
  mensagem = "Carregando...";
  usuarioAutenticado!: Usuario;

  constructor(public compartilhamento: CompartilharListService, private mensagemService: MensagensService,
    private contratoService: ContratoService, private datePipe: DatePipe, private modal: NgbModal, private titleService: Title) {
    this.titleService.setTitle("Buses Control - Contratos");
    this.validaResolucao();
    this.usuarioAutenticado = JSON.parse(localStorage.getItem("usuarioAutenticado")!);
  }

  ngOnInit(): void {
    this.tituloPag = "Contratos";
    this.contratoList = [];
    this.contratoService.GetContratosAtivos(this.compartilhamento.getPaginaAtualContrato(), this.compartilhamento.getFiltroContrato(), this.compartilhamento.getPageSizeContrato(), this.compartilhamento.getPesquisaContrato()).subscribe({
      next: (x) => {
        if (!x.contractList.length) {
          this.mensagem = "Nenhum registro encontrado.";
          return;
        }
        this.contratoList = x.contractList;
        this.compartilhamento.setTotPaginaContrato(x.qtPaginas);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.mensagemService.addMensagemError("Desculpe, ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde ou entre em contato com o suporte do sistema.");
          this.mensagem = "Desculpe, ocorreu um erro ao processar a solicitação.";
        }
      }
    });
  }

  GetContratosAtivos() {
    this.tituloPag = "Contratos";
    this.inativosSelect = false;
    this.contratoService.GetContratosAtivos(this.compartilhamento.getPaginaAtualContrato(), this.compartilhamento.getFiltroContrato(), this.compartilhamento.getPageSizeContrato(), this.compartilhamento.getPesquisaContrato()).subscribe((itens) => {
      this.contratoList = itens.contractList;
      this.compartilhamento.setTotPaginaContrato(itens.qtPaginas);
      if (!this.contratoList.length) {
        this.mensagem = "Nenhum registro encontrado!";
      }
    });
  }

  GetContratosInativos() {
    this.tituloPag = "Contratos";
    this.inativosSelect = true;
    this.compartilhamento.setPaginaAtualContrato(1);
    this.contratoService.GetContratosInativos(this.compartilhamento.getPaginaAtualContrato(), this.compartilhamento.getPesquisaContrato()).subscribe((itens) => {
      this.contratoList = itens.contractList;
      this.compartilhamento.setTotPaginaContrato(itens.qtPaginas);
      if (!this.contratoList.length) {
        this.mensagem = "Nenhum registro encontrado!";
      }
    });
  }

  proximoAtivosPaginate() {
    if (this.compartilhamento.getPaginaAtualContrato() == this.compartilhamento.getTotPaginaContrato()) {
      return;
    }
    this.compartilhamento.setPaginaAtualContrato(this.compartilhamento.getPaginaAtualContrato() + 1);
    this.contratoService.GetContratosAtivos(this.compartilhamento.getPaginaAtualContrato(), this.compartilhamento.getFiltroContrato(), this.compartilhamento.getPageSizeContrato(), this.compartilhamento.getPesquisaContrato()).subscribe((itens) => {
      this.contratoList = itens.contractList;
    })
  }
  anteriorAtivosPaginate() {
    if (this.compartilhamento.getPaginaAtualContrato() == 1) {
      return;
    }
    this.compartilhamento.setPaginaAtualContrato(this.compartilhamento.getPaginaAtualContrato() - 1);
    this.contratoService.GetContratosAtivos(this.compartilhamento.getPaginaAtualContrato(), this.compartilhamento.getFiltroContrato(), this.compartilhamento.getPageSizeContrato(), this.compartilhamento.getPesquisaContrato()).subscribe((itens) => {
      this.contratoList = itens.contractList;
    });
  }

  proximoInativosPaginate() {
    if (this.compartilhamento.getPaginaAtualContrato() == this.compartilhamento.getTotPaginaContrato()) {
      return;
    }
    this.compartilhamento.setPaginaAtualContrato(this.compartilhamento.getPaginaAtualContrato() + 1);
    this.contratoService.GetContratosInativos(this.compartilhamento.getPaginaAtualContrato(), this.compartilhamento.getPesquisaContrato()).subscribe(itens => {
      this.contratoList = itens.contractList;
    });
  }
  anteriorInativosPaginate() {
    if (this.compartilhamento.getPaginaAtualContrato() == 1) {
      return;
    }
    this.compartilhamento.setPaginaAtualContrato(this.compartilhamento.getPaginaAtualContrato() - 1);
    this.contratoService.GetContratosInativos(this.compartilhamento.getPaginaAtualContrato(), this.compartilhamento.getPesquisaContrato()).subscribe((itens) => {
      this.contratoList = itens.contractList;
    });
  }

  Pesquisar(event: Event) {
    const input = event.target as HTMLInputElement;
    this.compartilhamento.setPesquisaContrato(input.value);
    this.compartilhamento.setPaginaAtualContrato(1);
    if (!this.inativosSelect) {
      this.contratoService.GetContratosAtivos(this.compartilhamento.getPaginaAtualContrato(), this.compartilhamento.getFiltroContrato(), this.compartilhamento.getPageSizeContrato(), this.compartilhamento.getPesquisaContrato())
        .subscribe(itens => {
          this.contratoList = itens.contractList;
          this.compartilhamento.setTotPaginaContrato(itens.qtPaginas);
        });
    } else {
      this.contratoService.GetContratosInativos(this.compartilhamento.getPaginaAtualContrato(), this.compartilhamento.getPesquisaContrato())
        .subscribe(itens => {
          this.contratoList = itens.contractList;
          this.compartilhamento.setTotPaginaContrato(itens.qtPaginas);
        });
    }
    if (!this.contratoList.length) this.mensagem = "Nenhum registro encontrado.";
  }
  Filtrar(event: Event) {
    const select = event.target as HTMLInputElement;
    this.compartilhamento.setFiltroContrato(Number(select.value));
    this.compartilhamento.setPaginaAtualContrato(1);
    if (!this.inativosSelect) {
      this.contratoService.GetContratosAtivos(this.compartilhamento.getPaginaAtualContrato(), this.compartilhamento.getFiltroContrato(), this.compartilhamento.getPageSizeContrato(), this.compartilhamento.getPesquisaContrato())
        .subscribe(itens => {
          this.contratoList = itens.contractList;
          this.compartilhamento.setTotPaginaContrato(itens.qtPaginas);
          if (!this.contratoList.length) this.mensagem = "Nenhum registro encontrado.";
        });
    } else {
      this.contratoService.GetContratosInativos(this.compartilhamento.getPaginaAtualContrato(), this.compartilhamento.getPesquisaContrato())
        .subscribe(itens => {
          this.contratoList = itens.contractList;
          this.compartilhamento.setTotPaginaContrato(itens.qtPaginas);
          if (!this.contratoList.length) this.mensagem = "Nenhum registro encontrado.";
        });
    }
  }
  TabelaSize(event: Event) {
    const select = event.target as HTMLInputElement;
    this.compartilhamento.setPageSizeContrato(Number(select.value));
    this.compartilhamento.setPaginaAtualContrato(1);
    this.contratoService.GetContratosAtivos(this.compartilhamento.getPaginaAtualContrato(), this.compartilhamento.getFiltroContrato(), this.compartilhamento.getPageSizeContrato(), this.compartilhamento.getPesquisaContrato()).subscribe(itens => {
      this.contratoList = itens.contractList;
      this.compartilhamento.setTotPaginaContrato(itens.qtPaginas);
      if (!this.contratoList.length) this.mensagem = "Nenhum registro encontrado!";
    });
  }
  RelatorioExcel() {
    this.contratoService.downloadFileExcel(!this.inativosSelect).subscribe({
      next: (response) => {
        let url = window.URL.createObjectURL(response);
        let a = document.createElement('a');
        a.href = url;
        a.download = (!this.inativosSelect) ? "Relatório - contratos ativos" : "Relatório - contratos inativos";
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }, error: (error: HttpErrorResponse) => {
        this.mensagemService.addMensagemError(error.error);
      }
    });
  }
  RelatorioPdf() {
    this.contratoService.downloadPdfRelatorio(!this.inativosSelect).subscribe({
      next: (response) => {
        let url = window.URL.createObjectURL(response);
        let a = document.createElement('a');
        a.href = url;
        a.download = (!this.inativosSelect) ? "Contratos ativos" : "Contratos inativos";
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      error: (error: HttpErrorResponse) => {
        this.mensagemService.addMensagemError(error.error);
      }
    });
  }

  returnDataFormatada(data: string) {
    const value = this.datePipe.transform(data, "dd/MM/yyyy");
    return value
  }
  returnTypePagamento(type: number) {
    if (type == 0) {
      return "Parcelado";
    }
    else {
      return "À vista"
    }
  }
  returnAndamento(status: number) {
    if (status == 0) {
      return "Em tramitação";
    } else if (status == 1) {
      return "Em andamento";
    }
    else {
      return "Encerrado";
    }
  }
  returnAprovacao(status: number) {
    if (status == 0) {
      return "Em análise";
    } else if (status == 1) {
      return "Reprovado";
    }
    else {
      return "Aprovado";
    }
  }
  returnStatus(status: number) {
    if (status == 0) {
      return "Ativo";
    }
    else {
      return "Inativado";
    }
  }

  returnDinheiro(valor: number): string {
    const formatoMoeda = {
      style: 'currency',
      currency: 'BRL',
    };

    return valor.toLocaleString('pt-BR', formatoMoeda);
  }

  aprovacaoContrato(item: Contrato) {
    const modalOptions = {
      size: "md"
    }
    const modalRef = this.modal.open(AprovacaoContratoComponent, modalOptions);
    modalRef.componentInstance.contrato = item;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.AtualizarListContratos();
    });
  }
  consultClientes(item: Contrato) {
    const modalOptions = {
      size: 'lg'
    };
    const modalRef = this.modal.open(ViewClientescontratoComponent, modalOptions);
    modalRef.componentInstance.contrato = item;
  }
  impressoes(item: Contrato) {
    const modalOptions = {
      size: 'lg'
    }
    const modalRef = this.modal.open(GerirPdfComponent, modalOptions);
    modalRef.componentInstance.contrato = item;
  }
  gerirContrato(item: Contrato) {
    var modalOptions;
    if (item.statusContrato == 0) {
      modalOptions = {
        size: "md"
      }
    } else {
      modalOptions = {
        size: "lg"
      }
    }
    const modalRef = this.modal.open(GerirContratoComponent, modalOptions);
    modalRef.componentInstance.contrato = item;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.AtualizarListContratos();
    });
  }
  substituicoes(contrato: Contrato) {
    const modalStyle = {
      size: 'lg'
    };
    const modalRef = this.modal.open(SubstituicoesComponent, modalStyle);
    modalRef.componentInstance.contrato = contrato;
  }

  returnCorAprovacao(aprovacao: number) {
    if (aprovacao == 0) {
      return "azul-borda";
    }
    if (aprovacao == 1) {
      return "orange-borda";
    }
    if (aprovacao == 2) {
      return "roxo-borda";
    }
    return "";
  }
  returnCorAndamento(andamento: number) {
    if (andamento == 0) {
      return "azul-borda";
    }
    if (andamento == 1) {
      return "verde-borda";
    }
    if (andamento == 2) {
      return "roxo-borda";
    }
    return "";
  }

  AtualizarListContratos() {
    if (!this.inativosSelect) {
      this.contratoService.GetContratosAtivos(this.compartilhamento.getPaginaAtualContrato(), this.compartilhamento.getFiltroContrato(), this.compartilhamento.getPageSizeContrato(), this.compartilhamento.getPesquisaContrato())
        .subscribe((itens) => {
          if (itens.contractList.length == 0 && this.compartilhamento.getPaginaAtualContrato() > 1) {
            this.compartilhamento.setPaginaAtualContrato(this.compartilhamento.getPaginaAtualContrato() - 1);
            this.AtualizarListContratos();
          } else {
            this.contratoList = itens.contractList;
            this.compartilhamento.setTotPaginaContrato(itens.qtPaginas);
            if (this.contratoList.length == 0) this.mensagem = "Nenhum registro encontrado.";
          }
        });
    } else {
      this.contratoService.GetContratosInativos(this.compartilhamento.getPaginaAtualContrato(), this.compartilhamento.getPesquisaContrato())
        .subscribe((itens) => {
          if (itens.contractList.length == 0 && this.compartilhamento.getPaginaAtualContrato() > 1) {
            this.compartilhamento.setPaginaAtualContrato(this.compartilhamento.getPaginaAtualContrato() - 1);
            this.AtualizarListContratos();
          } else {
            this.contratoList = itens.contractList;
            this.compartilhamento.setTotPaginaContrato(itens.qtPaginas);
            if (this.contratoList.length == 0) this.mensagem = "Nenhum registro encontrado.";
          }
        });
    }
  }

  larguraMinima = false;
  @HostListener('window:resize', ['$event'])
  validaResolucao() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 900) {
      this.larguraMinima = true
    } else {
      this.larguraMinima = false;
    }
  }
}
