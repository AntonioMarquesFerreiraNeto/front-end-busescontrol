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
    let labesDatas = this.relatorioInput.simpleAnalytics.LabelsDates;
    let datasReceitas = this.relatorioInput.simpleAnalytics.simpleReceitasList.map((item) => {
      return {
        x: item.dateMothYear,
        y: item.valTotMothYear
      }
    });
    let datasDespesas = this.relatorioInput.simpleAnalytics.simpleDespesasList.map((item) => {
      return {
        x: item.dateMothYear,
        y: item.valTotMothYear
      }
    });
    this.myChart = new Chart(htmlRef, {
      type: 'line',
      data: {
        labels: labesDatas,
        datasets: [
          {
            label: 'Receita mensal',
            backgroundColor: 'rgba(80, 80, 196, 0.1)',
            borderColor: 'rgb(80, 80, 196)',
            borderWidth: 1.5,
            data: datasReceitas,
            cubicInterpolationMode: 'monotone',
            fill: true
          },
          {
            label: 'Despesa mensal',
            backgroundColor: 'rgba(241, 60, 90, 0.1)',
            borderColor: 'rgb(241, 60, 90)',
            borderWidth: 1.5,
            data: datasDespesas,
            cubicInterpolationMode: 'monotone',
            fill: true
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
}