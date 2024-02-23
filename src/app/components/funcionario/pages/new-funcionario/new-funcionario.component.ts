import { HttpErrorResponse } from '@angular/common/http';
import { Component, IterableDiffers, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { EstadoAndUF } from 'src/app/interfaces/EstadoAndUF';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { MensagensService } from 'src/app/services/mensagens.service';


@Component({
  selector: 'app-new-funcionario',
  templateUrl: './new-funcionario.component.html',
  styleUrls: ['./new-funcionario.component.css'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class NewFuncionarioComponent implements OnInit {

  funcionarioForm!: FormGroup;
  loudingActive = false;
  listEstadoUf!: EstadoAndUF[];
  constructor(private mensagemService: MensagensService, private funcionarioService: FuncionarioService, private router: Router, private compartilhamento: CompartilharListService) {
    compartilhamento.GetEstadoAndUfList().subscribe(x => this.listEstadoUf = x);
  }
  cargos = [
    { value: 0, nome: "Motorista" },
    { value: 1, nome: "Assistente" },
    { value: 2, nome: "Administrador" }
  ];

  ngOnInit(): void {
    this.funcionarioForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
      email: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required, Validators.minLength(9)]),
      cargo: new FormControl(null, [Validators.required]),
      cep: new FormControl('', [Validators.required, Validators.minLength(8)]),
      complementoResidencial: new FormControl('', [Validators.required]),
      numeroResidencial: new FormControl('', [Validators.required]),
      logradouro: new FormControl('', [Validators.required]),
      ddd: new FormControl('', [Validators.required]),
      bairro: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      estado: new FormControl(null, [Validators.required])
    });
    this.mensagemService.addMensagemInfo("Atenção, motoristas não tem acesso ao sistema.");
  }

  get name() {
    return this.funcionarioForm.get('name')!;
  }
  get dataNascimento() {
    return this.funcionarioForm.get('dataNascimento')!;
  }
  get cpf() {
    return this.funcionarioForm.get('cpf')!;
  }
  get email() {
    return this.funcionarioForm.get('email')!;
  }
  get telefone() {
    return this.funcionarioForm.get('telefone')!;
  }
  get cargo() {
    return this.funcionarioForm.get('cargo')!;
  }
  get cep() {
    return this.funcionarioForm.get('cep')!;
  }
  get complementoResidencial() {
    return this.funcionarioForm.get('complementoResidencial')!;
  }
  get numeroResidencial() {
    return this.funcionarioForm.get('numeroResidencial')!;
  }
  get logradouro() {
    return this.funcionarioForm.get('logradouro')!;
  }
  get ddd() {
    return this.funcionarioForm.get('ddd')!;
  }
  get bairro() {
    return this.funcionarioForm.get('bairro')!;
  }
  get cidade() {
    return this.funcionarioForm.get('cidade')!;
  }
  get estado() {
    return this.funcionarioForm.get('estado')!;
  }

  buscarByCep() {
    const cepValue = this.funcionarioForm.get('cep')?.value;
    if (cepValue == '') {
      this.mensagemService.addMensagemError("Por favor, informe o CEP!");
      return;
    }
    this.compartilhamento.GetEnderecoByCep(cepValue).subscribe({
      next: (item) => {
        this.funcionarioForm.get('logradouro')?.setValue(item.logradouro);
        this.funcionarioForm.get('estado')?.setValue(item.uf);
        this.funcionarioForm.get('complementoResidencial')?.setValue(item.complemento);
        this.funcionarioForm.get('cidade')?.setValue(item.localidade);
        this.funcionarioForm.get('ddd')?.setValue(item.ddd);
        this.funcionarioForm.get('bairro')?.setValue(item.bairro);
        this.mensagemService.addMensagemSucesso("Endereço retornado com sucesso!");
      },
      error: () => {
        this.mensagemService.addMensagemError("Por favor, informe um CEP válido!");
      }
    });
  }
  submit() {
    if (this.funcionarioForm.invalid && !this.funcionarioForm.errors?.["serverError"]) {
      this.mensagemService.addMensagemError("Ops, consulte os campos para saber o problema!");
      return;
    }
    const data: Funcionario = this.funcionarioForm.value;
    data.cpf = data.cpf.replace(/\D/g, '');
    data.cargo = Number(data.cargo);
    data.telefone = data.telefone.replace('-', '');
    data.cep = data.cep.replace('-', '');

    this.loudingActive = true;
    this.funcionarioService.CreateFuncionario(data).subscribe({
      next: () => {
        this.loudingActive = false;
        this.mensagemService.addMensagemSucesso("Registrado com sucesso!");
        this.router.navigate(["/funcionario"]);
      },
      error: (error: HttpErrorResponse) => {
        this.loudingActive = false;
        if (error.status === 0) {
          this.mensagemService.addMensagemError("Desculpe, ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde ou entre em contato com o suporte do sistema.");
          return;
        }
        if (typeof error.error !== 'object') {
          this.mensagemService.addMensagemError(error.error);
          return;
        }
        const listaErros = error.error.errors;
        const errosFormulario = [];
        if (listaErros) {
          Object.keys(listaErros).forEach((nameAtributo) => {
            const formControl = this.funcionarioForm.get(this.lowerFirstCaracter(nameAtributo));
            const erro = { atributo: nameAtributo, mensagem: listaErros[nameAtributo] };
            errosFormulario.push(erro);
            formControl?.setErrors({ serverError: listaErros[nameAtributo] });
          });
        }
      }
    });
  }
  lowerFirstCaracter(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
}
