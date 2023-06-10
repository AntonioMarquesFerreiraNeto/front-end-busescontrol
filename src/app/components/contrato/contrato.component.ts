import { Component, OnInit, HostListener } from '@angular/core';
import { Contrato } from 'src/app/interfaces/Contrato';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { MensagensService } from 'src/app/services/mensagens.service';
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

  constructor(public compartilhamento: CompartilharListService, private mensagemService: MensagensService) { 
    this.validaResolucao();
  }

  ngOnInit(): void {
    this.contratoList = [];
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




  larguraMinima = false;
  @HostListener('window:resize', ['$event'])
  validaResolucao() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 800) {
      this.larguraMinima = true
    }
  }
}
