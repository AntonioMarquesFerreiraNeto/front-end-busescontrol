import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { ConsultClienteComponent } from 'src/app/components/contrato/pages/consult-cliente/consult-cliente.component';
import { Financeiro } from 'src/app/interfaces/Financeiro';
import { Parcela } from 'src/app/interfaces/Parcela';
import { ClienteService } from 'src/app/services/cliente.service';
import { FinanceiroService } from 'src/app/services/financeiro.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-contabilizacoes',
  templateUrl: './contabilizacoes.component.html',
  styleUrls: ['./contabilizacoes.component.css'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class ContabilizacoesComponent implements OnInit {
  tituloPag!: string;
  financeiro!: Financeiro;
  qtPaginas!: number;
  pageNumber: number = 1;
  pageSizeParcela: number = 10;
  clienteResponsavel = false;
  pesquisa: string = '';
  mensagem = "carregando...";

  //Variaveis da URL financeiro.
  refPageNumber: number = 1;
  refFiltro: number = 4;
  refPageSize: number = 20;
  refPesquisa: string = "";

  constructor(private datePipe: DatePipe, private financeiroService: FinanceiroService,
    private mensagemService: MensagensService,
    private route: ActivatedRoute, private router: Router,
    private clienteService: ClienteService, private modal: NgbModal) {
    this.validaResolucao();
  }

  ngOnInit(): void {
    this.tituloPag = "Pagamentos";
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.ColetarParametrosUrl();
    this.financeiroService.GetFinanceiroById(id).subscribe({
      next: (data) => {
        this.financeiro = data;
        this.financeiroService.GetPaginationAndFiltroParcelas(this.financeiro.id!, 1, this.pageSizeParcela, '').subscribe((x) => {
          this.financeiro.parcelas = x.listParcela;
          this.qtPaginas = x.qtPaginas;
        })
        if (this.financeiro.pessoaFisica?.idVinculacaoContratual) this.clienteResponsavel = true;
      },
      error: () => {
        this.mensagemService.addMensagemError("Desculpe, ID não foi encontrado!");
        this.router.navigate([`financeiro/${this.refPageNumber}`]);
      }
    });
  }

  ColetarParametrosUrl() {
    const pageFinanceiro = Number(this.route.snapshot.paramMap.get("refPageFinanceiro"));
    const filtro = Number(this.route.snapshot.paramMap.get("refFiltro"));
    const pageSize = Number(this.route.snapshot.paramMap.get("refPageSize"));
    const pesquisa = this.route.snapshot.paramMap.get("refPesquisa") || "";
    this.refPageNumber = (!isNaN(pageFinanceiro)) ? pageFinanceiro : 1;
    this.refFiltro = (!isNaN(filtro)) ? filtro : 4;
    this.refPageSize = (!isNaN(pageSize)) ? pageSize : 20;
    this.refPesquisa = pesquisa;
  }

  larguraMinima = false;
  @HostListener('window:resize', ['$event'])
  validaResolucao() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 896) {
      this.larguraMinima = true
    } else {
      this.larguraMinima = false;
    }
  }


  returnSituacao(situacao: number) {
    if (situacao == 0) return "Em espera";
    else if (situacao == 1) return "Efetuada";
    else return "Atrasada";
  }
  returnCorSituacao(situacao: number) {
    if (situacao == 0) return "azul-borda";
    else if (situacao == 1) return "verde-borda";
    else return "roxo-borda";
  }

  returnDinheiroFormat(value: number) {
    const formatacao = {
      style: 'currency',
      currency: 'BRL'
    };
    return (value != null) ? value.toLocaleString("pt-BR", formatacao) : "R$ 0,00";
  }

  returnDateFormat(value: string) {
    if (value == '') return "Não possui";
    const dataFormatada = this.datePipe.transform(value, "dd/MM/yyyy");
    return dataFormatada;
  }

  ReturnNamePessoa() {
    if (this.financeiro.fornecedorId) return this.financeiro.fornecedor?.nameOrRazaoSocial;
    else if (this.financeiro.pessoaFisicaId) return this.financeiro.pessoaFisica?.name;
    else return this.financeiro.pessoaJuridica?.nomeFantasia;
  }

  Contabilizar(parcelaId: number) {
    this.financeiroService.ContabilizarPagamento(parcelaId).subscribe({
      next: () => {
        this.mensagemService.addMensagemSucesso("Pagamento efetuado com sucesso!");
        const parcela = this.financeiro.parcelas!.find(x => x.id == parcelaId)!;
        this.AtualizarDashTable(parcela);
        this.financeiroService.GetPaginationAndFiltroParcelas(this.financeiro.id!, this.pageNumber, this.pageSizeParcela, this.pesquisa).subscribe((x) => {
          this.financeiro.parcelas = x.listParcela;
          this.qtPaginas = x.qtPaginas;
        });
      },
      error: (error: HttpErrorResponse) => {
        this.mensagemService.addMensagemError(error.error);
      }
    });
  }
  AtualizarDashTable(parcela: Parcela) {
    if (this.financeiro.valorTotalPago) this.financeiro.valorTotalPago += this.financeiro.valorParcelaDR!;
    else this.financeiro.valorTotalPago = this.financeiro.valorParcelaDR;
    if (this.financeiro.valorTotTaxaJurosPaga) {
      if (parcela.valorJuros) this.financeiro.valorTotTaxaJurosPaga += parcela.valorJuros;
    }
    else {
      if (parcela.valorJuros) this.financeiro.valorTotTaxaJurosPaga = parcela.valorJuros;
    }
  }
  proximaPagina() {
    if (this.qtPaginas <= this.pageNumber) return;
    this.pageNumber++;
    this.financeiroService.GetPaginationAndFiltroParcelas(this.financeiro.id!, this.pageNumber, this.pageSizeParcela, this.pesquisa).subscribe((x) => {
      this.financeiro.parcelas = x.listParcela;
      this.qtPaginas = x.qtPaginas;
    });
  }
  paginaAnterior() {
    if (this.pageNumber == 1) return;
    this.pageNumber--;
    this.financeiroService.GetPaginationAndFiltroParcelas(this.financeiro.id!, this.pageNumber, this.pageSizeParcela, this.pesquisa).subscribe((x) => {
      this.financeiro.parcelas = x.listParcela;
      this.qtPaginas = x.qtPaginas;
    });
  }

  filtrar(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pesquisa = input.value;
    this.financeiroService.GetPaginationAndFiltroParcelas(this.financeiro.id!, 1, this.pageSizeParcela, this.pesquisa).subscribe((x) => {
      this.financeiro.parcelas = x.listParcela;
      this.qtPaginas = x.qtPaginas;
      this.pageNumber = 1;
      if (x.listParcela.length == 0) {
        this.mensagem = "Nenhum registro encontrado!";
      }
    });
  }

  TabelaSize(event: Event) {
    const value = event.target as HTMLInputElement;
    this.pageSizeParcela = Number(value.value);
    this.financeiroService.GetPaginationAndFiltroParcelas(this.financeiro.id!, 1, this.pageSizeParcela, this.pesquisa).subscribe((x) => {
      this.financeiro.parcelas = x.listParcela;
      this.qtPaginas = x.qtPaginas;
      this.pageNumber = 1;
      if (x.listParcela.length == 0) {
        this.mensagem = "Nenhum registro encontrado!";
      }
    });
  }

  baixarExcel() {
    this.financeiroService.GetRelatorioParcelasExcel(this.financeiro.id!).subscribe({
      next: (response) => {
        let url = window.URL.createObjectURL(response);
        let a = document.createElement('a');
        a.href = url;
        let name;
        if (this.financeiro.despesaReceita == 0) {
          name = this.financeiro.fornecedor?.nameOrRazaoSocial;
        }
        else {
          if (this.financeiro.pessoaFisica) {
            name = this.financeiro.pessoaFisica.name;
          } else {
            name = this.financeiro.pessoaJuridica?.nomeFantasia;
          }
        }
        a.download = `Parcelas - ${name}`;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      error: (error: HttpErrorResponse) => {
        this.mensagemService.addMensagemError(error.error);
      }
    });
  }
  baixarPdf() {
    this.financeiroService.GetRelatorioParcelasPdf(this.financeiro.id!).subscribe({
      next: (response) => {
        let url = window.URL.createObjectURL(response);
        let a = document.createElement('a');
        a.href = url;
        let name;
        if (this.financeiro.despesaReceita == 0) {
          name = this.financeiro.fornecedor?.nameOrRazaoSocial;
        }
        else {
          if (this.financeiro.pessoaFisica) {
            name = this.financeiro.pessoaFisica.name;
          } else {
            name = this.financeiro.pessoaJuridica?.nomeFantasia;
          }
        }
        a.download = `Parcelas - ${name}`;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      error: (error: HttpErrorResponse) => {
        this.mensagemService.addMensagemError(error.error);
      }
    });
  }
  ConsultarClienteResponsavel() {
    this.clienteService.GetClienteById(this.financeiro.pessoaFisica!.idVinculacaoContratual!).subscribe({
      next: (data) => {
        const modalStyle = {
          size: 'md'
        };
        const modalRef = this.modal.open(ConsultClienteComponent, modalStyle);
        modalRef.componentInstance.clienteFisico = data;
      },
      error: (error: HttpErrorResponse) => {
        this.mensagemService.addMensagemError(error.error);
      }
    });
  }
}
