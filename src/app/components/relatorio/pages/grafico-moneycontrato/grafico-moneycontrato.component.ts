import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { bottom } from '@popperjs/core';
import { Chart } from 'chart.js';
import { Relatorio } from 'src/app/interfaces/Relatorio';
@Component({
  selector: 'app-grafico-moneycontrato',
  templateUrl: './grafico-moneycontrato.component.html',
  styleUrls: ['./grafico-moneycontrato.component.css']
})
export class GraficoMoneycontratoComponent implements OnInit {
  myChart: any;
  delayed = false;
  @Input() relatorioInput!: Relatorio;

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    this.chartGrafico();
  }

  chartGrafico() {
    let chartRef = this.elementRef.nativeElement.querySelector("#myChartId");
    this.myChart = new Chart(chartRef, {
      type: 'bar',
      data: {
        labels: [`Total previsto de ${this.ReturnDinheiroFormat(this.relatorioInput.valTotContratos)}`],
        datasets: [
          {
            label: 'Aprovados R$',
            backgroundColor: 'rgb(80, 80, 196, 0.8)',
            data: [this.relatorioInput.valTotAprovados]
          },
          {
            label: 'Em análise R$',
            backgroundColor: 'rgba(40, 197, 166, 0.8)',
            data: [this.relatorioInput.valTotEmAnalise]
          },
          {
            label: 'Reprovados R$',
            backgroundColor: 'rgba(255, 165, 0, 0.8)',
            data: [this.relatorioInput.valTotReprovados]
          }
        ]
      },
      options: {
        responsive: true,
        aspectRatio: 1.8,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            ticks: {
              callback: function(value) {
                return 'R$ ' + value;
              }
            }
          }
        }
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
