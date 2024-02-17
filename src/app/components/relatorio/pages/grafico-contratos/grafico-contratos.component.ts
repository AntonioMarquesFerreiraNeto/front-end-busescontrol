import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Relatorio } from 'src/app/interfaces/Relatorio';
@Component({
  selector: 'app-grafico-contratos',
  templateUrl: './grafico-contratos.component.html',
  styleUrls: ['./grafico-contratos.component.css']
})
export class GraficoContratosComponent implements OnInit {
  myChart: any;
  @Input() relatorioInput!: Relatorio;
  constructor(private elementRef: ElementRef){

  }

  ngOnInit(): void {
    this.chartGrafico();
  }

  chartGrafico(){
    let delayed: any;
    let htmlRef = this.elementRef.nativeElement.querySelector("#myChartId");
    this.myChart = new Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: [`Total de ${this.relatorioInput.qtContratos} contratos.`],
        datasets: [
          {
            label: 'Aprovados',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgb(153, 102, 255)',
            borderWidth: 1,
            data: [this.relatorioInput.qtContratosAprovados]
          },
          {
            label: 'Em análise',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
            data: [this.relatorioInput.qtContratosEmAnalise]
          },
          {
            label: 'Reprovados',
            backgroundColor: 'rgba(255, 205, 86, 0.2)',
            borderColor: 'rgb(255, 205, 86)',
            borderWidth: 1,
            data: [this.relatorioInput.qtContratosNegados]
          },
          {
            label: 'Encerrados',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
            data: [this.relatorioInput.qtContratosEncerrados]
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
        }
      }
    });
}

}
