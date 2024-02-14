import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Relatorio } from 'src/app/interfaces/Relatorio';

@Component({
  selector: 'app-grafico-clientes',
  templateUrl: './grafico-clientes.component.html',
  styleUrls: ['./grafico-clientes.component.css']
})
export class GraficoClientesComponent implements OnInit{
  myChart: any;
  @Input() relatorio!: Relatorio;
  constructor(private elementRef: ElementRef){

  }

  ngOnInit(): void {
      this.graficoCliente();
  }
  graficoCliente(){
    let htmlRef = this.elementRef.nativeElement.querySelector("#myChartId");
    this.myChart = new Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: [`${this.relatorio.qtClientes} clientes ativos neste momento`],
        datasets: [
          {
            label: 'Com contratos aprovados',
            backgroundColor: 'rgba(0, 245, 0, 0.2)',
            borderColor: 'rgba(0, 255, 0, 0.9)',
            borderWidth: 1,
            data: [this.relatorio.qtClientesVinculados]
          },
          {
            label: 'Clientes adimplentes',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
            data: [this.relatorio.qtClientesAdimplente]
          },
          {
            label: 'Clientes inadimplentes',
            backgroundColor: 'rgba(255, 205, 86, 0.2)',
            borderColor: 'rgb(255, 205, 86)',
            borderWidth: 1,
            data: [this.relatorio.qtClientesInadimplente]
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }   
        }
      }
    });
  }
}
