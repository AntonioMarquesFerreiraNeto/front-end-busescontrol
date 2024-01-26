import { Component, OnInit } from '@angular/core';
import { UserauthService } from 'src/app/services/userauth.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MensagensService } from 'src/app/services/mensagens.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RedefinirSenha } from 'src/app/interfaces/redefinirSenha';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-redefinirsenha',
  templateUrl: './redefinirsenha.component.html',
  styleUrls: ['./redefinirsenha.component.css']
})
export class RedefinirsenhaComponent implements OnInit {
  typeNewSenha = "password";
  iconNewSenha = true;
  typeConfirmSenha = "password";
  iconConfirmSenha = true;
  loudingActive = true;
  chave = "";
  redefinirSenhaForm!: FormGroup;


  constructor(private authService: UserauthService, private mensagemService: MensagensService, private router: Router, private route: ActivatedRoute, private titleService: Title) {
    this.titleService.setTitle("Buses Control - Redefinir senha");
  }
  ngOnInit(): void {

    this.chave = this.route.snapshot.paramMap.get("chave")!.toString();
    this.authService.ConsultChaveRedefinition(this.chave).subscribe({
      next: () => {
        this.mensagemService.addMensagemInfo("Olá, você está prestes a redefinir sua senha. Escolha senhas segura!");
        this.loudingActive = false;
        return;
      },
      error: (error: HttpErrorResponse) => {
        this.mensagemService.addMensagemError(error.error);
        this.router.navigate(["/login"]);
      }
    });

    this.redefinirSenhaForm = new FormGroup({
      novaSenha: new FormControl('', [Validators.required, Validators.minLength(12)]),
      confirmarSenha: new FormControl('', [Validators.required, Validators.minLength(12)]),
    });
  }
  get novaSenha() {
    return this.redefinirSenhaForm.get('novaSenha')!;
  }
  get confirmarSenha() {
    return this.redefinirSenhaForm.get('confirmarSenha')!;
  }

  Submit() {
    if (this.redefinirSenhaForm.invalid) {
      return;
    }
    const data: RedefinirSenha = this.redefinirSenhaForm.value;
    if (this.senhaForteValidator(data.novaSenha)) {
      this.mensagemService.addMensagemError("A senha precisa incluir letras, números e ao menos um caractere especial!");
      return;
    }
    data.chaveRedefinition = this.chave;
    this.authService.RedefinirSenha(data).subscribe({
      next: () => {
        this.mensagemService.addMensagemSucesso("Senha redefinida com sucesso, agora você pode realizar a autenticação!");
        this.router.navigate(["/login"]);
      }, error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.mensagemService.addMensagemError(error.error);
          this.router.navigate(["/login"]);
          return;
        }
        this.mensagemService.addMensagemError(error.error);
      }
    });
  }
  senhaForteValidator(senha: string): boolean | null {
    const senhaForteRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{12,}$/;
    if (!senhaForteRegex.test(senha)) {
      return true;
    }
    return null;
  }
  OcultarMostrarSenha(value: number) {
    switch (value) {
      case 1:
        if (this.typeNewSenha == 'password') {
          this.typeNewSenha = "text";
          this.iconNewSenha = false;
        } else {
          this.typeNewSenha = "password";
          this.iconNewSenha = true;
        }
        break;
      case 2:
        if (this.typeConfirmSenha == 'password') {
          this.typeConfirmSenha = "text";
          this.iconConfirmSenha = false;
        } else {
          this.typeConfirmSenha = "password";
          this.iconConfirmSenha = true;
        }
        break;

    }
  }

}
