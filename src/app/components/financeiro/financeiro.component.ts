import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewLancamentoComponent } from './pages/new-lancamento/new-lancamento.component';
import { EditLancamentoComponent } from './pages/edit-lancamento/edit-lancamento.component';
import { Financeiro } from 'src/app/interfaces/Financeiro';
import { FinanceiroService } from 'src/app/services/financeiro.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe, Location } from '@angular/common';
import { GerirFinanceiroComponent } from './pages/gerir-financeiro/gerir-financeiro.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.css'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class FinanceiroComponent implements OnInit {
  tituloPag: string = "Financeiro";
  financeiroList: Financeiro[] = [];
  paginaNumber: number = 1;
  totPaginas!: number;
  pesquisa: string = "";
  pageSize = 20;
  filtro = 4;
  mensagem: string = "Carregando...";
  loudingActive = true;

  constructor(private datePipe: DatePipe, private modal: NgbModal, private financeiroService: FinanceiroService, private mensagemService: MensagensService, private route: ActivatedRoute, private titleService: Title) {
    this.titleService.setTitle("Buses Control - Financeiro");
    this.validaResolucao();
  }

  ngOnInit(): void {
    if(Number(this.route.snapshot.paramMap.get("pageNumber"))) this.ColetarParametrosURL();
    this.financeiroService.GetListFinanceiro(this.paginaNumber, this.pesquisa, this.filtro, this.pageSize).subscribe({
      next: (response) => {
        this.financeiroList = response.listFinanceiro;
        this.totPaginas = response.qtPaginas;
        this.loudingActive = false;
        if (this.financeiroList.length == 0) this.mensagem = "Nenhum registro encontrado!";
      },
      error: (error: HttpErrorResponse) => {
        this.loudingActive = false;
        if (error.status == 0) {
          this.mensagemService.addMensagemError("Desculpe, ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde ou entre em contato com o suporte do sistema.");
          this.mensagem = "Desculpe, ocorreu um erro ao processar a solicitação.";
        }
      }
    });
  }

  ColetarParametrosURL(){
    const refPaginaNumber = Number(this.route.snapshot.paramMap.get("pageNumber"));
    const refFiltro = Number(this.route.snapshot.paramMap.get("filtro"));
    const refPagesize = Number(this.route.snapshot.paramMap.get("pageSize"));
    this.paginaNumber = (refPaginaNumber != 0) ? refPaginaNumber : 1;
    this.filtro = refFiltro;
    this.pageSize = (refPagesize != 0) ? refPagesize : 20;
    this.pesquisa = this.route.snapshot.paramMap.get("pesquisa") || "";
  }

  larguraMinima = false;
  larguraMinimaTwo = false;
  @HostListener('window:resize', ['$event'])
  validaResolucao() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 896) {
      this.larguraMinima = true
    } else {
      this.larguraMinima = false;
    }

    if (screenWidth < 1100) {
      this.larguraMinimaTwo = true;
    } else {
      this.larguraMinimaTwo = false;
    }
  }

  ModalNewLancamento() {
    const modalOp = {
      size: 'lg'
    }
    const modalRef = this.modal.open(NewLancamentoComponent, modalOp);
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.atualizarList();
      this.mensagemService.addMensagemSucesso("Lançamento efetuado com sucesso!");
      modalRef.close()
    });
  }
  ModalEditLancamento(financeiro: Financeiro) {
    const modalOp = {
      size: 'lg'
    }
    const modalRef = this.modal.open(EditLancamentoComponent, modalOp)
    modalRef.componentInstance.financeiro = financeiro;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.atualizarList();
      this.mensagemService.addMensagemSucesso("Lançamento editado com sucesso!");
      modalRef.close();
    });
  }

  ModalGerirFinanceiro(financeiro: Financeiro) {
    const modalOp = {
      size: 'md'
    }
    const modalRef = this.modal.open(GerirFinanceiroComponent, modalOp);
    modalRef.componentInstance.financeiro = financeiro;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.atualizarList();
      modalRef.close()
    });

  }

  ReturnNamePessoa(financeiro: Financeiro) {
    if (financeiro.fornecedorId) return financeiro.fornecedor?.nameOrRazaoSocial;
    else if (financeiro.pessoaFisicaId) return financeiro.pessoaFisica?.name;
    else return financeiro.pessoaJuridica?.nomeFantasia;
  }

  ReturnDataFormatada(data: string) {
    const dataFormatada = this.datePipe.transform(data, "dd/MM/yyyy");
    return dataFormatada;
  }

  ReturnPagament(pagament: number) {
    if (pagament == 0) return "Parcelado";
    else return "À vista";
  }

  ReturnTypeLancamento(value: number) {
    return (value == 0) ? "Despesa" : "Receita";
  }
  ReturnCorLancamento(value: number) {
    return (value == 0) ? "roxo-borda" : "azul-borda";
  }

  returnStatus(status: number) {
    return (status == 1) ? 'Ativada' : 'Inativa';
  }
  returnCorStatus(status: number) {
    return (status == 1) ? "verde-borda" : "roxo-borda";
  }
  returnDinheiro(valor: number): string {
    const formatoMoeda = {
      style: 'currency',
      currency: 'BRL',
    };

    return valor.toLocaleString('pt-BR', formatoMoeda);
  }

  atualizarList() {
    this.financeiroService.GetListFinanceiro(this.paginaNumber, this.pesquisa, this.filtro, this.pageSize).subscribe((response) => {
      this.financeiroList = response.listFinanceiro;
      this.totPaginas = response.qtPaginas;
    });
  }

  proximaPagina() {
    if (this.paginaNumber == this.totPaginas) return;
    this.paginaNumber++;
    this.financeiroService.GetListFinanceiro(this.paginaNumber, this.pesquisa, this.filtro, this.pageSize).subscribe(
      {
        next: (response) => {
          this.financeiroList = response.listFinanceiro;
          this.totPaginas = response.qtPaginas;
        }
      }
    );
  }

  anteriorPagina() {
    if (this.paginaNumber == 1) return;
    this.paginaNumber--;
    this.financeiroService.GetListFinanceiro(this.paginaNumber, this.pesquisa, this.filtro, this.pageSize).subscribe(
      {
        next: (response) => {
          this.financeiroList = response.listFinanceiro;
          this.totPaginas = response.qtPaginas;
        }
      }
    );
  }

  Pesquisa(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.pesquisa = value;
    this.financeiroService.GetListFinanceiro(1, this.pesquisa, this.filtro, this.pageSize).subscribe({
      next: (response) => {
        this.financeiroList = response.listFinanceiro;
        this.totPaginas = response.qtPaginas;
        this.paginaNumber = 1;
        if (this.financeiroList.length == 0) this.mensagem = "Nenhum registro encontrado!";
      },
    });
  }

  Filtrar(event: Event) {
    const select = event.target as HTMLInputElement;
    this.filtro = Number(select.value);
    this.paginaNumber = 1;
    this.financeiroService.GetListFinanceiro(this.paginaNumber, this.pesquisa, this.filtro, this.pageSize).subscribe(x => {
      this.financeiroList = x.listFinanceiro;
      this.totPaginas = x.qtPaginas;
      if (this.financeiroList.length == 0) this.mensagem = "Nenhum registro encontrado!";
    });
  }

  TabelaSize(event: Event){
    const select = event.target as HTMLInputElement;
    this.pageSize = Number(select.value);
    this.paginaNumber = 1;
    this.financeiroService.GetListFinanceiro(this.paginaNumber, this.pesquisa, this.filtro, this.pageSize).subscribe(x => {
      this.financeiroList = x.listFinanceiro;
      this.totPaginas = x.qtPaginas;
      if(this.financeiroList.length == 0) this.mensagem = "Nenhum registro encontrado!";
    });
  }

  BaixarRelatorioExcel() {
    this.financeiroService.GetPlanilhaFinanceiro(this.filtro, this.pesquisa).subscribe({
      next: (response) =>{
        let url = window.URL.createObjectURL(response);
        let a = document.createElement('a');
        a.href = url;
        a.download = "Relatório excel - Financeiro";
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    });
  }
  BaixarRelatorioPdf() {
    this.financeiroService.GetPdfFinanceiro(this.filtro, this.pesquisa).subscribe({
      next: (response) => {
        let url = window.URL.createObjectURL(response);
        let a = document.createElement('a');
        a.href = url;
        a.download = "Relatório - financeiro";
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }, error: (error: HttpErrorResponse) => {
        this.mensagemService.addMensagemError(error.error);
      }
    });
  }
}
