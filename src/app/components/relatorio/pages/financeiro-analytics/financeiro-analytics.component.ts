import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Relatorio } from 'src/app/interfaces/Relatorio';

@Component({
  selector: 'app-financeiro-analytics',
  templateUrl: './financeiro-analytics.component.html',
  styleUrls: ['./financeiro-analytics.component.css']
})
export class FinanceiroAnalyticsComponent implements OnInit {
  @Input() relatorioInput!: Relatorio;
  myChart: any;
  constructor(private elementRef: ElementRef, private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.gerarGrafico();
  }

  gerarGrafico() {
    let htmlRef = this.elementRef.nativeElement.querySelector('#myChartId');
    const groupDataReceita: { [key: string]: number } = {};
    const groupDataDespesa: { [key: string]: number } = {};
    this.relatorioInput.simpleAnalytics.forEach((item) => {
      const monthYear = this.ReturnDateFormat(item.dataEmissao)!;
      if (item.despesaReceita == 1) {
        if (!groupDataReceita[monthYear]) {
          groupDataReceita[monthYear] = item.valorTotDR;
        } else {
          groupDataReceita[monthYear] += item.valorTotDR;
        }
      } else {
        if (!groupDataDespesa[monthYear]) {
          groupDataDespesa[monthYear] = item.valorTotDR;
        } else {
          groupDataDespesa[monthYear] += item.valorTotDR;
        }
      }
    });

    this.myChart = new Chart(htmlRef, {
      type: 'line',
      data: {
        labels: Object.keys(groupDataReceita),
        datasets: [
          {
            label: 'Receita mensal',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
            data: Object.values(groupDataReceita)
          },
          {
            label: 'Despesa mensal',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
            data: Object.values(groupDataDespesa)
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

  ReturnDateFormat(value: string) {
    return this.datePipe.transform(value, "MM/yyyy");
  }
}