import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contrato } from 'src/app/interfaces/Contrato';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { AprovacaoContratoComponent } from './pages/aprovacao-contrato/aprovacao-contrato.component';
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
    this.contratoList = [];
    this.contratoService.GetContratosAtivos(1, true).subscribe((x) => {
      if(x.contractList.length == 0){
        this.mensagem = "Nenhum registro encontrado.";
        return;
      }
      this.contratoList = x.contractList;
      this.compartilhamento.setTotPaginaContrato(x.qtPaginas);
    });
  }

  GetContratosAtivos(){

  }

  GetContratosInativos(){

  }

  proximoAtivosPaginate(){

  }
  anteriorAtivosPaginate(){

  }

  proximoInativosPaginate(){

  }
  anteriorInativosPaginate(){

  }

  returnDataFormatada(data: string){
    const value = this.datePipe.transform(data, "dd/MM/yyyy");
    return value
  }
  returnTypePagamento(type: number){
    if(type == 0){
      return "Parcelado";
    }
    else{
      return "À vista"
    }
  }
  returnAndamento(status: number){
    if(status == 0){
      return "Em espera";
    } else if(status == 1){
      return "Em andamento";
    }
    else{
      return "Encerrado";
    }
  }
  returnAprovacao(status: number){
    if(status == 0){
      return "Em análise";
    } else if(status == 1){
      return "Negado";
    }
    else{
      return "Aprovado";
    }
  }
  returnStatus(status: number){
    if(status == 0){
      return "Ativo";
    }
    else{
      return "Inativado";
    }
  }

  returnDinheiro(valor: number): string{
    const formatoMoeda = {
      style: 'currency',
      currency: 'BRL',
    };
  
    return valor.toLocaleString('pt-BR', formatoMoeda);
  }

  aprovacaoContrato(item: Contrato){
    const modalOptions ={
      size: "md"
    }
    const modalRef = this.modal.open(AprovacaoContratoComponent, modalOptions);
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
