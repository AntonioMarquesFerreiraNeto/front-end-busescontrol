import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Financeiro } from 'src/app/interfaces/Financeiro';
import { FinanceiroService } from 'src/app/services/financeiro.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-gerir-financeiro',
  templateUrl: './gerir-financeiro.component.html',
  styleUrls: ['./gerir-financeiro.component.css']
})
export class GerirFinanceiroComponent implements OnInit{

  @Output() financeiro!: Financeiro;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();

  tituloPag!: string;
  textoDescricao!: string;
  constructor(public modal: NgbActiveModal, private mensagemService: MensagensService, private financeiroService: FinanceiroService){
    
  }

  ngOnInit(): void {
    this.tituloPag = (this.financeiro.financeiroStatus == 1) ? "Confirmação" : "Consulta";
    this.textoDescricao = (this.financeiro.financeiroStatus == 1) ? "Deseja realmente inativar este lançamento?" : `Consultar ${this.returnDespReceita()}: `
  }

  ActionModal(){
    this.financeiroService.InativarFinanceiro(this.financeiro.id!).subscribe({
      next: () =>{
        this.mensagemService.addMensagemSucesso("Lançamento inativado com sucesso!");
        this.onSubmitted.emit();
      }, 
      error: (error: HttpErrorResponse) =>{
        this.mensagemService.addMensagemError(error.error);
        this.modal.dismiss();
      }
    });
  }

  returnDespReceita(){
    return (this.financeiro.despesaReceita == 0) ? "Despesa" : "Receita";
  }
  returnStatusFinanceiro(){
    return (this.financeiro.financeiroStatus == 1) ? "Ativada" : "Inativa";
  }

  returnCredorDevedor(){
    if(this.financeiro.fornecedorId){
      return this.financeiro.fornecedor?.nameOrRazaoSocial;
    } else if (this.financeiro.pessoaFisicaId){
      return this.financeiro.pessoaFisica?.name;
    } else{
      return this.financeiro.pessoaJuridica?.razaoSocial;
    }
  }
  returnPagamento(){
    return (this.financeiro.pagament == 0) ? "Parcelado" : "À vista";
  }
  returnTypePagamento(){
    if(this.financeiro.typeEfetuacao == 0) return "Crédito";
    else if (this.financeiro.typeEfetuacao == 2) return "Débito";
    else return "Espécie";
  }

  returnDinheiroFormat(value: number){
    const formatacao = {
      style: 'currency',
      currency: 'BRL'
    };

    return value.toLocaleString('pt-BR', formatacao);
  }
  returnQtParcelas(){
    return (this.financeiro.pagament == 1) ? "Pagamento único" : `${this.financeiro.qtParcelas}`
  }
}
