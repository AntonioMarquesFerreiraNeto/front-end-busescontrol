import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientePjService } from 'src/app/services/cliente-pj.service';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { ClienteJuridico } from 'src/app/interfaces/ClienteJuridico';
import { EstadoAndUF } from 'src/app/interfaces/EstadoAndUF';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-edit-clientepj',
  templateUrl: './edit-clientepj.component.html',
  styleUrls: ['./edit-clientepj.component.css'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class EditClientepjComponent implements OnInit {
  clienteForm!: FormGroup;
  loudingActive = true;
  listEstadoUf!: EstadoAndUF[];
  constructor(private clienteService: ClientePjService, private route: ActivatedRoute, private router: Router, private mensagemService: MensagensService, private compartilhamento: CompartilharListService) {
    compartilhamento.GetEstadoAndUfList().subscribe(x => this.listEstadoUf = x);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clienteService.GetClienteById(id).subscribe({
      next: (item) => {
        this.clienteForm = new FormGroup({
          id: new FormControl(id),
          nomeFantasia: new FormControl(item.nomeFantasia, [Validators.required]),
          razaoSocial: new FormControl(item.razaoSocial, [Validators.required]),
          cnpj: new FormControl(item.cnpj, [Validators.required, Validators.minLength(14)]),
          inscricaoMunicipal: new FormControl(item.inscricaoMunicipal, [Validators.required]),
          inscricaoEstadual: new FormControl(item.inscricaoEstadual, [Validators.required]),
          email: new FormControl(item.email),
          telefone: new FormControl(item.telefone, [Validators.required, Validators.minLength(9)]),
          cep: new FormControl(item.cep, [Validators.required, Validators.minLength(8)]),
          complementoResidencial: new FormControl(item.complementoResidencial, [Validators.required]),
          numeroResidencial: new FormControl(item.numeroResidencial, [Validators.required]),
          logradouro: new FormControl(item.logradouro, [Validators.required]),
          ddd: new FormControl(item.ddd, [Validators.required]),
          bairro: new FormControl(item.bairro, [Validators.required]),
          cidade: new FormControl(item.cidade, [Validators.required]),
          estado: new FormControl(item.estado, [Validators.required])
        });
        this.loudingActive = false;
      },
      error: (error: HttpErrorResponse) => {
        this.mensagemService.addMensagemError(error.error);
        this.router.navigate(["/cliente-juridico"]);
      }
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

  submitEdit() {
    if (this.clienteForm.invalid) {
      return;
    }

    const data: ClienteJuridico = this.clienteForm.value;
    data.cnpj = data.cnpj.replace(/\D/g, '');
    data.telefone = data.telefone.replace('-', '');
    data.cep = data.cep.replace('-', '');
    
    this.clienteService.UpdateClientePJ(data).subscribe({
      next: () => {
        this.mensagemService.addMensagemSucesso("Atualizado com sucesso!");
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
