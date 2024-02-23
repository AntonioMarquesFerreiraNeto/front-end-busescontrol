import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModaluserauthComponent } from './components/dropdown-user/modais/modaluserauth/modaluserauth.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserauthService } from './services/userauth.service';
import { Usuario } from './interfaces/User';
import {  } from '@angular/animations'
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class AppComponent implements OnInit {
  classMenu!: string;
  mostrarMenu!: boolean;
  usuarioAutenticado!: Usuario;
  display_dropdown = false;
  logoTxt = "BUS";
  constructor(private modal: NgbModal, private router: Router, private teste: UserauthService, private elementRef: ElementRef, private renderer: Renderer2) {
    this.validaResolucao();
    this.validaResolucaoBolean();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.ValidarRota('');
      });
  }

  ngOnInit(): void {
    this.mostrarMenu = Boolean(localStorage.getItem("userAuth"));
    this.usuarioAutenticado = JSON.parse(localStorage.getItem("usuarioAutenticado")!);
  }

  Logout() {
    this.teste.Logout();
  }
  OpenDropDown() {
    this.display_dropdown = (!this.display_dropdown) ? true : false;
  }
  ValidarRota(componentName: string): boolean {
    // Obter o primeiro segmento da rota ativa
    const currentRoute = this.router.routerState.snapshot.url;
    const firstSegment = currentRoute.split('/')[1];
    // Comparar o primeiro segmento da rota com o nome do componente fornecido
    return firstSegment === componentName;
  }

  sidebarCollapse() {
    if (this.classMenu == "active") {
      this.classMenu = "sidebar.active";
      this.logoTxt = "Bus"
    } else {
      this.classMenu = "active";
      this.logoTxt = "BUS"
    }
  }
  @HostListener('window:resize', ['$event'])
  validaResolucao() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 592) {
      this.classMenu = "sidebar.active";
    } else {
      this.classMenu = "active";
    }
  }
  larguraMinima = false;
  @HostListener('window:resize', ['$event'])
  validaResolucaoBolean() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 592) {
      this.larguraMinima = true
    } else {
      this.larguraMinima = false;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey(event: KeyboardEvent) {
    if (this.display_dropdown) {
      this.display_dropdown = false;
    }
  }

  closeDropdown() {
    this.display_dropdown = false;
  }
}

