import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ElementRef, Renderer2 } from '@angular/core';
import { MensagensService } from 'src/app/services/mensagens.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modaluserauth',
  templateUrl: './modaluserauth.component.html',
  styleUrls: ['./modaluserauth.component.css']
})
export class ModaluserauthComponent implements OnInit {
  userAuthForm!: FormGroup;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private mensagemService: MensagensService, public modalConfig: NgbActiveModal){

  }

  ngOnInit(): void {
    this.userAuthForm = new FormGroup({
      senhaAtual: new FormControl('', [Validators.required, Validators.minLength(8)]),
      novaSenha: new FormControl('', [Validators.required,  Validators.minLength(8)]),
      confirmSenha: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  get senhaAtual(){
    return this.userAuthForm.get('senhaAtual')!;
  }
  get novaSenha(){
    return this.userAuthForm.get('novaSenha')!;
  }
  get confirmSenha(){
    return this.userAuthForm.get('confirmSenha')!;
  }

  submitUser(){
    if(this.userAuthForm.invalid){
      return;
    }
    this.mensagemService.addMensagemSucesso("Senha alterada com sucesso!");
    this.modalConfig.dismiss();

  }

  OcultarOuMostrarSenha() {
    const senha = this.elementRef.nativeElement.querySelector("#senha");
    const senhaAtual = this.elementRef.nativeElement.querySelector("#senha_atual");
    const senhaConfirm = this.elementRef.nativeElement.querySelector("#confirm_senha");

    if (senha.type === "password") {
      this.renderer.setAttribute(senha, "type", "text");
    } else {
      this.renderer.setAttribute(senha, "type", "password");
    }

    if (senhaAtual.type === "password") {
      this.renderer.setAttribute(senhaAtual, "type", "text");
    } else {
      this.renderer.setAttribute(senhaAtual, "type", "password");
    }

    if (senhaConfirm.type == "password") {
      this.renderer.setAttribute(senhaConfirm, "type", "text");
    } else {
      this.renderer.setAttribute(senhaConfirm, "type", "password")
    }
  }
}
