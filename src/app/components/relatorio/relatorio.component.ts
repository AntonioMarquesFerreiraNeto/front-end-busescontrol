import { Component, NgModule, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PdfContratosComponent } from './pages/pdf-contratos/pdf-contratos.component';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Relatorio } from 'src/app/interfaces/Relatorio';
import { HttpErrorResponse } from '@angular/common/http';
import { MensagensService } from 'src/app/services/mensagens.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  relatorio!: Relatorio;
  constructor(private modal: NgbModal, private dashboardService: DashboardService, private mensagemService: MensagensService, private router: Router, private titleService: Title) {
    this.titleService.setTitle("Buses Control - Dashboard");
  }
  ngOnInit(): void {
    this.dashboardService.GetRelatorioDash().subscribe({
      next: (item) => {
        this.relatorio = item;
      }, 
      error: (error: HttpErrorResponse) => {
        if(error.status == 0){
          this.mensagemService.addMensagemError("Desculpe, ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde ou entre em contato com o suporte do sistema.");
        }
        else{
          this.mensagemService.addMensagemError(error.error);
        }
        this.router.navigate(["/home"]);
      }
    });
  }

  AbrirModalContratos() {
    const modalStyle = {
      size: 'lg'
    };
    this.modal.open(PdfContratosComponent, modalStyle);
  }

  ReturnDinheiroFormat(value: number){
    if(value == null){
      return "R$ 0,00"
    }
    const styleMoeda = {
      style: 'currency',
      currency: 'BRL'
    };
    return value.toLocaleString("pt-BR", styleMoeda);
  }

  ReturnBalancete(){
    const resultadoFinanceiro = this.relatorio.valTotEfetuadoReceita - this.relatorio.valTotEfetuadoDespesa;
    if(resultadoFinanceiro == null){
      return "R$ 0,00"
    }
    const styleMoeda = {
      style: 'currency',
      currency: 'BRL'
    };
    return resultadoFinanceiro.toLocaleString("pt-BR", styleMoeda);
  }
}
