import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Relatorio } from 'src/app/interfaces/Relatorio';

@Component({
  selector: 'app-financeiro-baranalytics',
  templateUrl: './financeiro-baranalytics.component.html',
  styleUrls: ['./financeiro-baranalytics.component.css']
})
export class FinanceiroBaranalyticsComponent implements OnInit{
  myChart: any;
  @Input() relatorioInput!: Relatorio;

  constructor(private elementRef: ElementRef){

  }

  ngOnInit(): void {
    this.graficoChart();
  }

  graficoChart(){
    let htmlRef = this.elementRef.nativeElement.querySelector('#myChartId');
    this.myChart = new Chart(htmlRef, {
      type: 'bar',
      data:{
        labels: ['Perfil Financeiro da Empresa'],
        datasets: [
          {
            label: 'Receitas',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgb(153, 102, 255)',
            borderWidth: 1,
            data: [this.relatorioInput.valorReceitasComuns]
          },
          {
            label: 'Despesas',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
            data: [this.relatorioInput.valTotDespesas]
          },
          {
            label: 'Receitas/contratos',
            backgroundColor: 'rgba(0, 245, 0, 0.2)',
            borderColor: 'rgba(0, 255, 0, 0.9)',
            borderWidth: 1,
            data: [this.relatorioInput.valTotAprovados]
          },
          {
            label: 'Juros/multas',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
            data: [this.relatorioInput.valorJurosAndMultas]
          }
        ]
      },
      options: {
        responsive: true,
        aspectRatio: 1.8,
        scales: {
          y: {
            ticks: {
              callback: function (value) {
                return 'R$ ' + value;
              }
            }
          }
        },
      }
    });
  }

  ReturnDinheiroFormat(value: number) {
    if (value == null) {
      return "R$ 0,00"
    }
    const styleMoeda = {
      style: 'currency',
      currency: 'BRL'
    };
    return value.toLocaleString("pt-BR", styleMoeda);
  }
}
