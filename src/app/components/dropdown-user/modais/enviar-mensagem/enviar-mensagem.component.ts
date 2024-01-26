import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { Lembrete } from 'src/app/interfaces/Lembrete';
import { Usuario } from 'src/app/interfaces/User';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { LembreteService } from 'src/app/services/lembrete.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-enviar-mensagem',
  templateUrl: './enviar-mensagem.component.html',
  styleUrls: ['./enviar-mensagem.component.css']
})
export class EnviarMensagemComponent implements OnInit {
  @Input() usuarioAutenticado!: Usuario;
  mensagemForm!: FormGroup;
  listUsuarios!: Funcionario[];
  nivelAcessoList = [
    { enum: 0, acess: "Individual" },
    { enum: 1, acess: "Assistentes" },
    { enum: 2, acess: "Administradores" },
    { enum: 3, acess: "Todos" }
  ];
  constructor(public modalService: NgbActiveModal, private funcionarioService: FuncionarioService, private lembreteService: LembreteService, private mensagemService: MensagensService) {

  }

  ngOnInit(): void {
    this.funcionarioService.GetUsuarios().subscribe(list => {
      const usuarioId = Number(this.usuarioAutenticado.nameid);
      this.listUsuarios = list.filter(x => x.id! !== usuarioId);
    });
    this.mensagemForm = new FormGroup({
      nivelAcesso: new FormControl(null, [Validators.required]),
      funcionarioId: new FormControl(null),
      conteudo: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
  }

  get nivelAcesso() {
    return this.mensagemForm.get("nivelAcesso")!;
  }
  get funcionarioId() {
    return this.mensagemForm.get("funcionarioId")!;
  }
  get conteudo() {
    return this.mensagemForm.get("conteudo")!;
  }

  submit() {
    var data = this.mensagemForm.value;
    if (data.nivelAcesso == 0 && data.funcionarioId == null) {
      console.log("entrou!");
      this.mensagemForm.get("funcionarioId")?.setErrors({ required: true });
    } else {
      this.mensagemForm.get("funcionarioId")?.clearValidators();
      this.mensagemForm.get("funcionarioId")?.updateValueAndValidity();
    }
    if (this.mensagemForm.invalid) return;
    data.remetenteId = Number(this.usuarioAutenticado.nameid);
    data = this.tratamentoDados(data);
    this.lembreteService.EnviarMensagem(data).subscribe({
      next: () => {
        this.lembreteService.NotificarEvento("start");
        this.mensagemService.addMensagemSucesso("Mensagem enviada com sucesso!");
      }
    });
    this.modalService.close();
  }

  tratamentoDados(lembrete: Lembrete) {
    if (lembrete.nivelAcesso != 0) {
      lembrete.funcionarioId = undefined;
    }
    return lembrete;
  }

}
