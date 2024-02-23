import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { ClienteJuridico } from 'src/app/interfaces/ClienteJuridico';
import { EstadoAndUF } from 'src/app/interfaces/EstadoAndUF';
import { ClientePjService } from 'src/app/services/cliente-pj.service';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-new-clientepj',
  templateUrl: './new-clientepj.component.html',
  styleUrls: ['./new-clientepj.component.css'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class NewClientepjComponent implements OnInit {
  clienteForm!: FormGroup;
  listEstadoUF!: EstadoAndUF[];
  constructor(private clienteService: ClientePjService, private compartilhamento: CompartilharListService, private mensagemService: MensagensService, private router: Router) {
    compartilhamento.GetEstadoAndUfList().subscribe(x => this.listEstadoUF = x);
  }
  ngOnInit(): void {
    this.clienteForm = new FormGroup({
      nomeFantasia: new FormControl('', [Validators.required]),
      razaoSocial: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required, Validators.minLength(14)]),
      inscricaoMunicipal: new FormControl('', [Validators.required]),
      inscricaoEstadual: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      telefone: new FormControl('', [Validators.required, Validators.minLength(9)]),
      cep: new FormControl('', [Validators.required, Validators.minLength(8)]),
      complementoResidencial: new FormControl('', [Validators.required]),
      numeroResidencial: new FormControl('', [Validators.required]),
      logradouro: new FormControl('', [Validators.required]),
      ddd: new FormControl('', [Validators.required]),
      bairro: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      estado: new FormControl(null, [Validators.required])
    });
  }

  get nomeFantasia() {
    return this.clienteForm.get('nomeFantasia')!;
  }
  get razaoSocial() {
    return this.clienteForm.get('razaoSocial')!;
  }
  get cnpj() {
    return this.clienteForm.get('cnpj')!;
  }
  get inscricaoMunicipal() {
    return this.clienteForm.get('inscricaoMunicipal')!;
  }
  get inscricaoEstadual() {
    return this.clienteForm.get('inscricaoEstadual')!;
  }
  get email() {
    return this.clienteForm.get('email')!;
  }
  get telefone() {
    return this.clienteForm.get('telefone')!;
  }
  get idVinculacaoContratual() {
    return this.clienteForm.get('idVinculacaoContratual')!;
  }
  get cep() {
    return this.clienteForm.get('cep')!;
  }
  get complementoResidencial() {
    return this.clienteForm.get('complementoResidencial')!;
  }
  get numeroResidencial() {
    return this.clienteForm.get('numeroResidencial')!;
  }
  get logradouro() {
    return this.clienteForm.get('logradouro')!;
  }
  get ddd() {
    return this.clienteForm.get('ddd')!;
  }
  get bairro() {
    return this.clienteForm.get('bairro')!;
  }
  get cidade() {
    return this.clienteForm.get('cidade')!;
  }
  get estado() {
    return this.clienteForm.get('estado')!;
  }

  submit() {
    console.log(this.clienteForm);
    if (this.clienteForm.invalid) {
      return;
    }

    const data: ClienteJuridico = this.clienteForm.value;
    data.cnpj = data.cnpj.replace(/\D/g, '');
    data.telefone = data.telefone.replace('-', '');
    data.cep = data.cep.replace("-", "");

    this.clienteService.CreateClientePJ(data).subscribe({
      next: () => {
        this.mensagemService.addMensagemSucesso("Adicionado com sucesso!");
        this.router.navigate(["/cliente-juridico"]);
      },
      error: (error: HttpErrorResponse) => {
        if (typeof error.error !== 'object') {
          this.mensagemService.addMensagemError(error.error);
          return;
        }
        const listErros = error.error.errors;
        const forms = [];
        if (listErros) {
          Object.keys(listErros).forEach((itemErro) =>{
            const formControl = this.clienteForm.get(this.lowerFirstCaracter(itemErro));
            const erro = { atributo: itemErro, mensagem: listErros[itemErro] };
            forms.push(erro);
            formControl?.setErrors({serverError: listErros[itemErro]});
          });
        }
      }
    });
  }
  lowerFirstCaracter(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  buscarByCep(cep: string) {
    if (!cep) {
      this.mensagemService.addMensagemError("Informe o CEP para realizar a consulta!");
      return;
    }
    this.compartilhamento.GetEnderecoByCep(cep).subscribe({
      next: (endereco) => {
        this.clienteForm.get('logradouro')?.setValue(endereco.logradouro);
        this.clienteForm.get('ddd')?.setValue(endereco.ddd);
        this.clienteForm.get('bairro')?.setValue(endereco.bairro);
        this.clienteForm.get('cidade')?.setValue(endereco.localidade);
        this.clienteForm.get('estado')?.setValue(endereco.uf);
        this.clienteForm.get('complementoResidencial')?.setValue(endereco.complemento);
        this.mensagemService.addMensagemSucesso("Cep retornado com sucesso!");
      },
      error: () => {
        this.mensagemService.addMensagemError("Por favor, informe um CEP válido!");
      }
    });
  }
}
