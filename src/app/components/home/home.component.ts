import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Usuario } from 'src/app/interfaces/User';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserauthService } from 'src/app/services/userauth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class HomeComponent {
  usuarioAutenticado!: Usuario;
  constructor(private dashService: DashboardService, private titleService: Title){
    this.titleService.setTitle("Buses Control");
    this.usuarioAutenticado = JSON.parse(localStorage.getItem("usuarioAutenticado")!);
    this.dashService.MonitorarNegocio().subscribe();
  }
}
