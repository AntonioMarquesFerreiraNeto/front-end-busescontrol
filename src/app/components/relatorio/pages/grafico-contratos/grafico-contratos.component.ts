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
            backgroundColor: 'rgb(80, 80, 196)',
            data: [this.relatorioInput.qtContratosAprovados]
          },
          {
            label: 'Em análise',
            backgroundColor: 'rgba(40, 197, 166)',
            data: [this.relatorioInput.qtContratosEmAnalise]
          },
          {
            label: 'Reprovados',
            backgroundColor: 'rgba(255, 165, 0)',
            data: [this.relatorioInput.qtContratosNegados]
          },
          {
            label: 'Encerrados',
            backgroundColor: 'rgba(241, 60, 90)',
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
