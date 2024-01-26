import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EsqueceuSenha } from 'src/app/interfaces/esqueceuSenha';
import { MensagensService } from 'src/app/services/mensagens.service';
import { UserauthService } from 'src/app/services/userauth.service';

@Component({
  selector: 'app-esqueceusenha',
  templateUrl: './esqueceusenha.component.html',
  styleUrls: ['./esqueceusenha.component.css']
})
export class EsqueceusenhaComponent  implements OnInit{
  esqueceuSenhaForm!: FormGroup;

  loudingActive = false;
  constructor(private mensagemService: MensagensService, private authservice: UserauthService, private router: Router, private titleService: Title){
    this.titleService.setTitle("Buses Control - Esqueceu senha");
  }

  ngOnInit(): void {
      this.esqueceuSenhaForm = new FormGroup({
          cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
          dataNascimento: new FormControl('', [Validators.required]),
          email: new FormControl('', [Validators.required])
        }
      );
  }

  get cpf(){
    return this.esqueceuSenhaForm.get('cpf')!;
  }
  get dataNascimento(){
    return this.esqueceuSenhaForm.get('dataNascimento')!;
  }
  get email(){
    return this.esqueceuSenhaForm.get('email')!;
  }

  Submit(){
    if(this.esqueceuSenhaForm.invalid){
      return;
    }
    this.loudingActive = true;
    const data: EsqueceuSenha = this.esqueceuSenhaForm.value;
    this.authservice.EsqueceuSenha(data).subscribe({
      next: () =>{
        this.loudingActive = false;
        this.mensagemService.addMensagemSucesso("Enviamos uma solicitação de redefinição de senha para o seu e-mail.");
        this.router.navigate(["/login"]);
      },
      error: (error: HttpErrorResponse) =>{
        this.loudingActive = false;
        this.mensagemService.addMensagemError(error.error);
      }
    });
  }
}
