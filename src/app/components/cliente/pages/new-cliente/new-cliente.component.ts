import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteFisico } from 'src/app/interfaces/ClienteFisico';
import { HttpErrorResponse } from '@angular/common/http';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { EstadoAndUF } from 'src/app/interfaces/EstadoAndUF';
import { fadeInOnEnterAnimation } from 'angular-animations';
@Component({
  selector: 'app-new-cliente',
  templateUrl: './new-cliente.component.html',
  styleUrls: ['./new-cliente.component.css'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class NewClienteComponent implements OnInit {
  clienteForm!: FormGroup;
  clientesList?: ClienteFisico[];
  listEstadoUf?: EstadoAndUF[];
  constructor(private mensagemService: MensagensService, private clienteService: ClienteService, private router: Router, public compartilhamento: CompartilharListService) {
    compartilhamento.GetEstadoAndUfList().subscribe((list) => this.listEstadoUf = list);
  }

  ngOnInit(): void {
    this.clienteService.GetClientesAutorizados().subscribe(itens => this.clientesList = itens);
    this.mensagemService.addMensagemInfo("Clientes menores de idade devem possuir vinculação.");
    this.clienteForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
      rg: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      telefone: new FormControl('', [Validators.required, Validators.minLength(9)]),
      idVinculacaoContratual: new FormControl(),
      nameMae: new FormControl('', [Validators.required]),
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
  get name() {
    return this.clienteForm.get('name')!;
  }
  get dataNascimento() {
    return this.clienteForm.get('dataNascimento')!;
  }
  get cpf() {
    return this.clienteForm.get('cpf')!;
  }
  get rg() {
    return this.clienteForm.get('rg')!;
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
  get nameMae() {
    return this.clienteForm.get('nameMae')!;
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
    if (this.clienteForm.invalid) {
      return;
    }
    const cliente: ClienteFisico = this.clienteForm.value;
    cliente.cpf = cliente.cpf.replace(/\D/g, '');
    cliente.telefone = cliente.telefone.replace('-', '');
    cliente.cep = cliente.cep.replace('-', '');
    if (cliente.idVinculacaoContratual) cliente.idVinculacaoContratual = Number(cliente.idVinculacaoContratual);
    else cliente.idVinculacaoContratual = undefined;
    this.clienteService.CreateCliente(cliente).subscribe({
      next: () => {
        this.mensagemService.addMensagemSucesso("Adicionado com sucesso!");
        this.router.navigate(["cliente/"]);
      },
      error: (error: HttpErrorResponse) => {
        if (typeof error.error !== 'object') {
          this.mensagemService.addMensagemError(error.error);
          return;
        }
        const listErros = error.error.errors;
        const erros = [];
        if (listErros) {
          Object.keys(listErros).forEach((itemErro) => {
            const formControl = this.clienteForm.get(this.lowerFirstCaracter(itemErro));
            const erro = { atributo: itemErro, mensagem: listErros[itemErro] };
            erros.push(erro);
            formControl?.setErrors({ serverError: listErros[itemErro] });
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
