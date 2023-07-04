import { CurrencyPipe, DatePipe } from '@angular/common';
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
@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {
  inativosSelect = false;
  tituloPag = "Contratos";
  contratoList!: Contrato[];
  mensagem = "Carregando...";

  constructor(public compartilhamento: CompartilharListService, private mensagemService: MensagensService,
    private contratoService: ContratoService, private datePipe: DatePipe, private modal: NgbModal) {
    this.validaResolucao();
  }

  ngOnInit(): void {
    this.tituloPag = "Contratos ativos";
    this.contratoList = [];
    this.contratoService.GetContratosAtivos(this.compartilhamento.getPaginaAtualContrato(), true).subscribe({
      next:(x) =>{
        if (!x.contractList.length) {
          this.mensagem = "Nenhum registro encontrado.";
          return;
        }
        this.contratoList = x.contractList;
        this.compartilhamento.setTotPaginaContrato(x.qtPaginas);
      }, 
      error: (error: HttpErrorResponse) =>{
        if (error.status === 0) {
          this.mensagemService.addMensagemError("Desculpe, ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde ou entre em contato com o suporte do sistema.");
          this.mensagem = "Desculpe, ocorreu um erro ao processar a solicitação.";
        }
      }
    });
    this.compartilhamento.contrato$.subscribe((list) => {
      this.contratoList = list;
    })
  }

  GetContratosAtivos() {
    this.tituloPag = "Contratos ativos";
    this.inativosSelect = false;
    this.contratoService.GetContratosAtivos(1, true).subscribe((itens) => {
      this.contratoList = itens.contractList;
      this.compartilhamento.setTotPaginaContrato(itens.qtPaginas);
      if(!this.contratoList.length){
        this.mensagem = "Nenhum registro encontrado!";
      }
    });
  }

  GetContratosInativos() {
    this.tituloPag = "Contratos inativos";
    this.inativosSelect = true;
    this.compartilhamento.setPaginaAtualContrato(1);
    this.contratoService.GetContratosInativos(this.compartilhamento.getPaginaAtualContrato(), true).subscribe((itens) => {
      this.contratoList = itens.contractList;
      this.compartilhamento.setTotPaginaContrato(itens.qtPaginas);
      if(!this.contratoList.length){
        this.mensagem = "Nenhum registro encontrado!";
      }
    });
  }

  proximoAtivosPaginate() {
    if (this.compartilhamento.getPaginaAtualContrato() == this.compartilhamento.getTotPaginaContrato()) {
      return;
    }
    this.compartilhamento.setPaginaAtualContrato(this.compartilhamento.getPaginaAtualContrato() + 1);
    this.contratoService.GetContratosAtivos(this.compartilhamento.getPaginaAtualContrato(), true).subscribe((itens) =>{
      this.contratoList = itens.contractList;
    })
  }
  anteriorAtivosPaginate() {
    if(this.compartilhamento.getPaginaAtualContrato() == 1){
      return;
    }
    this.contratoService.GetContratosAtivos(this.compartilhamento.getPaginaAtualContrato(), false).subscribe((itens) =>{
      this.contratoList = itens.contractList;
      this.compartilhamento.setPaginaAtualContrato(this.compartilhamento.getPaginaAtualContrato() - 1);
    });
  }

  proximoInativosPaginate() {
    if(this.compartilhamento.getPaginaAtualContrato() == this.compartilhamento.getTotPaginaContrato()){
      return;
    }
    this.contratoService.GetContratosInativos(this.compartilhamento.getPaginaAtualContrato() + 1, true).subscribe( itens => {
      this.contratoList = itens.contractList;
      this.compartilhamento.setPaginaAtualContrato(this.compartilhamento.getPaginaAtualContrato() + 1);
    });
  }
  anteriorInativosPaginate() {
    if(this.compartilhamento.getPaginaAtualContrato() == 1){
      return;
    }
    this.contratoService.GetContratosInativos(this.compartilhamento.getPaginaAtualContrato(), false).subscribe((itens) =>{
      this.contratoList = itens.contractList;
      this.compartilhamento.setPaginaAtualContrato(this.compartilhamento.getPaginaAtualContrato() - 1);
    });
  }

  RelatorioExcel(){
    this.contratoService.downloadFileExcel(!this.inativosSelect);
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
      return "Em espera";
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
      return "Negado";
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
    if(item.statusContrato == 0){
      modalOptions = {
        size: "md"
      }
    } else{
      modalOptions = {
        size: "lg"
      }
    }
    const modalRef = this.modal.open(GerirContratoComponent, modalOptions);
    modalRef.componentInstance.contrato = item;
  }

  larguraMinima = false;
  @HostListener('window:resize', ['$event'])
  validaResolucao() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 800) {
      this.larguraMinima = true
    }
  }
}
