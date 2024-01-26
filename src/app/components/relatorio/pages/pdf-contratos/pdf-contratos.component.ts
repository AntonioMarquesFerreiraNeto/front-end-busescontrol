import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contrato } from 'src/app/interfaces/Contrato';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-pdf-contratos',
  templateUrl: './pdf-contratos.component.html',
  styleUrls: ['./pdf-contratos.component.css']
})
export class PdfContratosComponent implements OnInit {
  contratos!: Contrato[];
  mensagem = "Carregando..."
  pesquisa = "";
  status = 0;
  filtros = [
    { value: 0, description: "Todos" },
    { value: 1, description: "Em andamento" },
    { value: 2, description: "Encerrados" }
  ];
  filtro!: FormGroup;
  constructor(public modal: NgbActiveModal, private dashboardService: DashboardService, private datePipe: DatePipe) {
    this.validaResolucao();
  }

  ngOnInit(): void {
    this.dashboardService.GetContratosAprovados(this.status, this.pesquisa).subscribe({
      next: (lista) => {
        this.contratos = lista;
        if (this.contratos.length == 0) {
          this.mensagem = "Nenhum registro encontrado!";
        }
      }
    });
    this.filtro = new FormGroup({
      filtroSelecionado: new FormControl(0)
    });
  }

  Pesquisar(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pesquisa = input.value;
    this.dashboardService.GetContratosAprovados(this.status, this.pesquisa).subscribe(x => {
      this.contratos = x;
      if (this.contratos.length == 0) {
        this.mensagem = "Nenhum registro encontrado!"
      }
    });
  }

  Filtrar() {
    console.log(1)
    this.status = Number(this.filtro.get('filtroSelecionado')?.value);
    this.dashboardService.GetContratosAprovados(this.status, this.pesquisa).subscribe(x => {
      this.contratos = x;
      if (this.contratos.length == 0) {
        this.mensagem = "Nenhum registro encontrado!"
      }
    });
  }

  larguraMinima = false;
  @HostListener('window:resize', ['$event'])
  validaResolucao() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 750) {
      this.larguraMinima = true
    } else {
      this.larguraMinima = false;
    }
  }

  ReturnDateFormatada(value: string) {
    const data = this.datePipe.transform(value, "dd/MM/yyyy");
    return data;
  }
  ReturnCorBordaAndamento(status: number) {
    if (status == 1) {
      return "verde-borda";
    } else {
      return "roxo-borda";
    }
  }
  ReturnAndamento(status: number) {
    if (status == 1) {
      return "Em andamento";
    } else {
      return "Encerrado";
    }
  }
  ReturnDinheiroFormat(valor: number) {
    const styleFormat = {
      style: 'currency',
      currency: 'BRL'
    }
    return valor.toLocaleString("pt-BR", styleFormat);
  }

  BaixarRelatorioContrato(id: number) {
    console.log(12);
    this.dashboardService.GetPdfContrato(id).subscribe({
      next: (response) => {
        let url = window.URL.createObjectURL(response);
        let a = document.createElement('a');
        a.href = url;
        a.download = `Relatório - Contrato nº ${id}`;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    });
  }
}
