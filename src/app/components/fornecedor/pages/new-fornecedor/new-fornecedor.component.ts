import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EstadoAndUF } from 'src/app/interfaces/EstadoAndUF';
import { Fornecedor } from 'src/app/interfaces/Fornecedor';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { FornecedorServiceService } from 'src/app/services/fornecedor-service.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-new-fornecedor',
  templateUrl: './new-fornecedor.component.html',
  styleUrls: ['./new-fornecedor.component.css']
})
export class NewFornecedorComponent implements OnInit {
  listEstadoUf!: EstadoAndUF[];
  fornecedorForm!: FormGroup;
  mensagemError!: string;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();

  constructor(public modal: NgbActiveModal, private compartilhar: CompartilharListService, private fornecedorService: FornecedorServiceService, private mensagemService: MensagensService) {
    compartilhar.GetEstadoAndUfList().subscribe(x => this.listEstadoUf = x);
  }

  ngOnInit(): void {
    this.fornecedorForm = new FormGroup({
      typePessoa: new FormControl(0),
      nameOrRazaoSocial: new FormControl('', [Validators.required]),
      dataFornecedor: new FormControl('', [Validators.required]),
      cpf: new FormControl(''),
      cnpj: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required, Validators.minLength(9)]),
      cep: new FormControl('', [Validators.required, Validators.minLength(8)]),
      numeroResidencial: new FormControl('', [Validators.required]),
      logradouro: new FormControl('', [Validators.required]),
      ddd: new FormControl('', [Validators.required]),
      bairro: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      estado: new FormControl(null, [Validators.required])
    });
  }

  get typePessoa() {
    return this.fornecedorForm.get("typePessoa")!;
  }
  get nameOrRazaoSocial() {
    return this.fornecedorForm.get("nameOrRazaoSocial")!;
  }
  get cpf() {
    return this.fornecedorForm.get('cpf')!;
  }
  get cnpj() {
    return this.fornecedorForm.get('cnpj')!;
  }
  get dataFornecedor() {
    return this.fornecedorForm.get('dataFornecedor')!;
  }
  get email() {
    return this.fornecedorForm.get('email')!;
  }
  get telefone() {
    return this.fornecedorForm.get('telefone')!;
  }
  get cep() {
    return this.fornecedorForm.get('cep')!;
  }
  get complementoResidencial() {
    return this.fornecedorForm.get('complementoResidencial')!;
  }
  get numeroResidencial() {
    return this.fornecedorForm.get('numeroResidencial')!;
  }
  get logradouro() {
    return this.fornecedorForm.get('logradouro')!;
  }
  get ddd() {
    return this.fornecedorForm.get('ddd')!;
  }
  get bairro() {
    return this.fornecedorForm.get('bairro')!;
  }
  get cidade() {
    return this.fornecedorForm.get('cidade')!;
  }
  get estado() {
    return this.fornecedorForm.get('estado')!;
  }

  buscarByCep(cep: string) {
    if(cep == ''){
      this.mensagemError = "Informe o CEP para realizar a consulta!"
      this.ocultarMensagem();
      return;
    }
    this.compartilhar.GetEnderecoByCep(cep).subscribe({
      next: (response) => {
        this.fornecedorForm.get("ddd")?.setValue(response.ddd);
        this.fornecedorForm.get("bairro")?.setValue(response.bairro);
        this.fornecedorForm.get("logradouro")?.setValue(response.logradouro);
        this.fornecedorForm.get("cidade")?.setValue(response.localidade);
        this.fornecedorForm.get("estado")?.setValue(response.uf);
      },
      error: () =>{
        this.mensagemError = "Por favor, informe um CEP válido!"
        this.ocultarMensagem();
      }
    });
  }

  submit() {
    const data: Fornecedor = this.fornecedorForm.value;
    const typePessoa = data.typePessoa;

    if (typePessoa == 0 && data.cpf == '') {
      this.fornecedorForm.get("cpf")?.setErrors({ required: true });
      this.fornecedorForm.get("cnpj")?.clearValidators();
      this.fornecedorForm.get("cnpj")?.updateValueAndValidity();
    } else if (typePessoa == 1 && data.cnpj == '') {
      this.fornecedorForm.get("cnpj")?.setErrors({ required: true });
      this.fornecedorForm.get("cpf")?.clearValidators();
      this.fornecedorForm.get("cpf")?.updateValueAndValidity();
    } else {
      this.fornecedorForm.get("cnpj")?.clearValidators();
      this.fornecedorForm.get("cnpj")?.updateValueAndValidity();
      this.fornecedorForm.get("cpf")?.clearValidators();
      this.fornecedorForm.get("cpf")?.updateValueAndValidity();
    }

    if (this.fornecedorForm.invalid) {
      return;
    }

    if (typePessoa == 0) {
      data.cpf = data.cpf!.replace(".", "").replace(",", "");
      data.cnpj = '';
    } else {
      data.cnpj = data.cnpj!.replace(".", "").replace(",", "");
      data.cpf = '';
    }
    data.telefone = data.telefone.replace(".", "").replace(",", "");
    data.cep = data.cep.replace("-", "");

    this.fornecedorService.Create(data).subscribe({
      next: () => {
        this.onSubmitted.emit();
        this.mensagemService.addMensagemSucesso("Fornecedor registrado com sucesso!");
        this.modal.dismiss();
      },
      error: (error: HttpErrorResponse) => {
        if (typeof error.error !== 'object') {
          this.mensagemError = error.error;
          this.ocultarMensagem();
          return;
        }
        const listErros = error.error.errors;
        const forms = [];
        if (listErros) {
          Object.keys(listErros).forEach((itemErro) => {
            const formControl = this.fornecedorForm.get(this.lowerFirstCaracter(itemErro));
            const erro = { atributo: itemErro, mensagem: listErros[itemErro] };
            forms.push(erro);
            formControl?.setErrors({ serverError: listErros[itemErro] });
          });
        }
      }
    });
  }
  lowerFirstCaracter(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
  ocultarMensagem() {
    setTimeout(() => {
      this.mensagemError = "";
    }, 4000);
  }

}
