import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteFisico } from 'src/app/interfaces/ClienteFisico';
import { ClienteJuridico } from 'src/app/interfaces/ClienteJuridico';
import { Financeiro } from 'src/app/interfaces/Financeiro';
import { Fornecedor } from 'src/app/interfaces/Fornecedor';
import { FinanceiroService } from 'src/app/services/financeiro.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-new-lancamento',
  templateUrl: './new-lancamento.component.html',
  styleUrls: ['./new-lancamento.component.css']
})
export class NewLancamentoComponent implements OnInit {
  mensagemError!: string;
  lancamentoForm!: FormGroup;
  listClientesPF!: ClienteFisico[];
  listClientesPJ!: ClienteJuridico[];
  listFornecedoresAll!: Fornecedor[];
  listTypeLancamento = [
    { enum: 0, texto: "Despesa" },
    { enum: 1, texto: "Receita" }
  ];
  listModelsPagament = [
    { enum: 0, texto: "Parcelado" },
    { enum: 1, texto: "À vista" }
  ];
  listTypeEfetuacao = [
    { enum: 0, texto: "Crédito" },
    { enum: 1, texto: "Espécie" },
    { enum: 2, texto: "Débito" }
  ];
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();

  constructor(public modal: NgbActiveModal, private datePipe: DatePipe, private financeiroService: FinanceiroService, private mensagemService: MensagensService) {

  }

  ngOnInit(): void {
    this.financeiroService.getAllClientesFisicos().subscribe((x) => this.listClientesPF = x);
    this.financeiroService.getAllClientesJuridicos().subscribe((x) => this.listClientesPJ = x);
    this.financeiroService.getAllFornecedores().subscribe((x) => this.listFornecedoresAll = x);

    this.lancamentoForm = new FormGroup({
      clienteId: new FormControl(null),
      typeEfetuacao: new FormControl(null, Validators.required),
      pagament: new FormControl(null, Validators.required),
      despesaReceita: new FormControl(null, Validators.required),
      fornecedorId: new FormControl(null),
      valorTotDR: new FormControl('', Validators.required),
      dataEmissao: new FormControl(this.returnDataAtual(), [Validators.required]),
      dataVencimento: new FormControl('', [Validators.required]),
      qtParcelas: new FormControl(''),
      detalhamento: new FormControl('', [Validators.required, Validators.minLength(30)])
    });
  }

  get clienteId() {
    return this.lancamentoForm.get('clienteId')!;
  }
  get typeEfetuacao() {
    return this.lancamentoForm.get('typeEfetuacao')!;
  }
  get pagament() {
    return this.lancamentoForm.get('pagament')!;
  }
  get despesaReceita() {
    return this.lancamentoForm.get('despesaReceita')!;
  }
  get fornecedorId() {
    return this.lancamentoForm.get('fornecedorId')!;
  }
  get valorTotDR() {
    return this.lancamentoForm.get('valorTotDR')!;
  }
  get dataEmissao() {
    return this.lancamentoForm.get('dataEmissao')!;
  }
  get dataVencimento() {
    return this.lancamentoForm.get('dataVencimento')!;
  }
  get qtParcelas() {
    return this.lancamentoForm.get('qtParcelas')!;
  }
  get detalhamento() {
    return this.lancamentoForm.get('detalhamento')!;
  }

  submit() {

    const lancamento: Financeiro = this.lancamentoForm.value;
    lancamento.qtParcelas = Number(lancamento.qtParcelas);
    lancamento.pagament = Number(lancamento.pagament);
    lancamento.despesaReceita = Number(lancamento.despesaReceita);
    lancamento.typeEfetuacao = Number(lancamento.typeEfetuacao);

    if (lancamento.despesaReceita == 0 && this.lancamentoForm.get('fornecedorId')?.value == null) {
      this.lancamentoForm.get("fornecedorId")?.setErrors({ required: true });
      this.lancamentoForm.get("clienteId")?.clearValidators();
      this.lancamentoForm.get("clienteId")?.updateValueAndValidity();
    } else if (lancamento.despesaReceita == 1 && this.lancamentoForm.get('clienteId')?.value == null) {
      this.lancamentoForm.get("clienteId")?.setErrors({ required: true });
      this.lancamentoForm.get("fornecedorId")?.clearValidators();
      this.lancamentoForm.get("fornecedorId")?.updateValueAndValidity();
    } else {
      this.lancamentoForm.get("fornecedorId")?.clearValidators();
      this.lancamentoForm.get("fornecedorId")?.updateValueAndValidity();
      this.lancamentoForm.get("clienteId")?.clearValidators();
      this.lancamentoForm.get("clienteId")?.updateValueAndValidity();
    }

    if (this.lancamentoForm.invalid) {
      return;
    }

    if (lancamento.pagament == 1) {
      lancamento.qtParcelas = 1;
    } else if (lancamento.qtParcelas < 2) {
      this.mensagemError = "Quantidade de parcelas inválida!";
      this.ocultarMsgError();
      return;
    }

    if (lancamento.despesaReceita == 1) {
      lancamento.fornecedorId = undefined;
      const clienteId = Number(this.lancamentoForm.get('clienteId')?.value);
      (this.listClientesPF.some(x => x.id == clienteId)) ? lancamento.pessoaFisicaId = clienteId : lancamento.pessoaJuridicaId = clienteId;
    }
    this.financeiroService.NewLancamento(lancamento).subscribe({
      next: () => {
        this.onSubmitted.emit();
      },
      error: (error: HttpErrorResponse) => {
        if (typeof error.error !== 'object') {
          this.mensagemError = error.error;
          this.ocultarMsgError();
          return;
        }
        const listErros = error.error.errors;
        const forms = [];
        if (listErros) {
          Object.keys(listErros).forEach((itemErro) => {
            const formControl = this.lancamentoForm.get(this.lowerFirstCaracter(itemErro));
            const erro = { atributo: itemErro, mensagem: listErros[itemErro] };
            forms.push(erro);
            formControl?.setErrors({ serverError: listErros[itemErro] });
          });
        }
      }
    });
  }
  lowerFirstCaracter(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  ocultarMsgError() {
    setTimeout(() => {
      this.mensagemError = "";
    }, 4000);
  }
  returnDataAtual() {
    const data: Date = new Date();
    const dia = data.getDate();
    const mes: number = data.getMonth() + 1;
    const ano = data.getFullYear();
    const dataAtual = new Date(ano, mes - 1, dia);
    return this.datePipe.transform(dataAtual, "yyyy-MM-dd");
  }
  returnCpfFormatado(cpf: string) {
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return cpf;
  }
  returnCnpjFormatado(cnpj: string) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
}