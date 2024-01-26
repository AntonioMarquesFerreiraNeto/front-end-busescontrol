import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/Login';
import { MensagensService } from 'src/app/services/mensagens.service';
import { UserauthService } from 'src/app/services/userauth.service';
import { Subscription, finalize } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  typeSenha = "password";
  iconSenha = true;
  loginForm!: FormGroup;
  loudingActive = false;
  private requestFinish: Subscription;
  constructor(private router: Router, public mensagensService: MensagensService, public userAuthService: UserauthService, private titleService: Title) {
    this.titleService.setTitle("Buses Control");
    this.requestFinish = userAuthService.GetAuthRequestFinish().subscribe(x => this.loudingActive = false);
  }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.router.navigate(["/home"]);
    }
    this.loginForm = new FormGroup({
      cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
      senha: new FormControl('', [Validators.required])
    });
  }
  get cpf() {
    return this.loginForm.get('cpf')!;
  }
  get senha() {
    return this.loginForm.get('senha')!;
  }

  OcultarMostrarSenha() {
    if (this.typeSenha == "password") {
      this.typeSenha = "text";
      this.iconSenha = false;
    } else {
      this.typeSenha = "password";
      this.iconSenha = true;
    }
  }

  Autenticar() {
    if (this.loginForm.invalid) return;
    this.loudingActive = true;
    const data: Login = this.loginForm.value;
    this.userAuthService.Autenticar(data);
  }
}
