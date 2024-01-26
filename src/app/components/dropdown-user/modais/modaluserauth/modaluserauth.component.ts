import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ElementRef, Renderer2 } from '@angular/core';
import { MensagensService } from 'src/app/services/mensagens.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/interfaces/User';
import { UserauthService } from 'src/app/services/userauth.service';
import { AlterSenha } from 'src/app/interfaces/AlterarSenha';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modaluserauth',
  templateUrl: './modaluserauth.component.html',
  styleUrls: ['./modaluserauth.component.css']
})
export class ModaluserauthComponent implements OnInit {
  userAuthForm!: FormGroup;
  viewSessaoAlterar = false;
  @Input() usuarioAutenticado!: Usuario;
  mensagemError!: string;
  constructor(private elementRef: ElementRef, private renderer: Renderer2, private mensagemService: MensagensService, public modalConfig: NgbActiveModal, private authService: UserauthService) {

  }

  ngOnInit(): void {
    this.userAuthForm = new FormGroup({
      senhaAtual: new FormControl('', [Validators.required, Validators.minLength(12)]),
      newSenha: new FormControl('', [Validators.required, Validators.minLength(12)]),
      confirmSenha: new FormControl('', [Validators.required, Validators.minLength(12)])
    });
  }

  get senhaAtual() {
    return this.userAuthForm.get('senhaAtual')!;
  }
  get newSenha() {
    return this.userAuthForm.get('newSenha')!;
  }
  get confirmSenha() {
    return this.userAuthForm.get('confirmSenha')!;
  }

  submitUser() {
    if (this.userAuthForm.invalid) {
      return;
    }
    const data: AlterSenha = this.userAuthForm.value;
    if (this.senhaForteValidator(data.newSenha)) {
      this.mensagemError = "A senha precisa incluir letras, números e ao menos um caractere especial!";
      setTimeout(() => { this.mensagemError = "" }, 8000);
      return;
    }
    data.usuarioId = this.usuarioAutenticado.nameid;
    this.authService.AlterarPassword(data).subscribe({
      next: () => {
        this.mensagemService.addMensagemSucesso("Senha alterada com sucesso!");
        this.modalConfig.dismiss();
        setTimeout(() => {
          this.authService.Logout();
        }, 7000);
      },
      error: (error: HttpErrorResponse) => {
        this.mensagemError = error.error;
        setTimeout(() => {
          this.mensagemError = ""
        }, 8000)
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

  ReturnCorRole(role: string) {
    switch (role) {
      case "Assistente":
        return "roxo-borda"
      case "Administrador":
        return "verde-borda";
      default: return "";
    }
  }

  MostrarSessaoAlterar() {
    if (this.viewSessaoAlterar) {
      this.viewSessaoAlterar = false;
    }
    else {
      this.viewSessaoAlterar = true;
    }
  }

  ReturnTitle() {
    if (this.viewSessaoAlterar) return "Senha";
    else return "Perfil";
  }

  iconNewsenhaEye = true;
  MostrarOcultarNewSenha() {
    const senha = this.elementRef.nativeElement.querySelector("#newsenha");
    if (senha.type === "password") {
      this.renderer.setAttribute(senha, "type", "text");
      this.iconNewsenhaEye = false;
    } else {
      this.renderer.setAttribute(senha, "type", "password");
      this.iconNewsenhaEye = true;
    }
  }
  iconConfirmsenhaEye = true;
  MostrarOcultarConfirmSenha() {
    const senha = this.elementRef.nativeElement.querySelector("#confirm_senha");
    if (senha.type === "password") {
      this.renderer.setAttribute(senha, "type", "text");
      this.iconConfirmsenhaEye = false;
    } else {
      this.renderer.setAttribute(senha, "type", "password");
      this.iconConfirmsenhaEye = true;
    }
  }
  iconSenhaEye = true;
  MostrarOcultarSenhaAtual() {
    const senha = this.elementRef.nativeElement.querySelector("#senha");
    if (senha.type === "password") {
      this.renderer.setAttribute(senha, "type", "text");
      this.iconSenhaEye = false;
    } else {
      this.renderer.setAttribute(senha, "type", "password");
      this.iconSenhaEye = true;
    }
  }

}
