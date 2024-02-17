import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Relatorio } from 'src/app/interfaces/Relatorio';

@Component({
  selector: 'app-grafico-percentualcliente',
  templateUrl: './grafico-percentualcliente.component.html',
  styleUrls: ['./grafico-percentualcliente.component.css']
})
export class GraficoPercentualclienteComponent implements OnInit {
  myChart: any;
  @Input() relatorioInput!: Relatorio;
  constructor(private elementRef: ElementRef){

  }

  ngOnInit(): void {
      this.graficoCliente();
  }

  graficoCliente(){
    let htmlRef = this.elementRef.nativeElement.querySelector("#myChartId");
    this.myChart = new Chart(htmlRef, {
      type: 'doughnut',
      data: {
        labels: ['Percentual adimplentes', 'Percentual inadimplentes'],
        datasets: [
          {
            label: 'Adimplentes %',
            backgroundColor: [
              'rgba(54, 162, 235, 0.3)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)'
            ],
            borderWidth: 1,
            data: [this.ReturnPercentualClient(this.relatorioInput.qtClientesAdimplente), this.ReturnPercentualClient(this.relatorioInput.qtClientesInadimplente)]
          }
        ]
      },
      options: {
        responsive: true,
        aspectRatio: 1.9,
        plugins: {
          legend: {
            position: 'top'
          }   
        },
      }
    });
  }

  ReturnPercentualClient(value: number){
    if(value == 0 || this.relatorioInput.qtClientes == 0) return 0;
    value = (value/this.relatorioInput.qtClientes) * 100;
    return value.toFixed(2);
  }
}
