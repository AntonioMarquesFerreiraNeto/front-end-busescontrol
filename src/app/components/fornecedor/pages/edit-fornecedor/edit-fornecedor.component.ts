import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EstadoAndUF } from 'src/app/interfaces/EstadoAndUF';
import { Fornecedor } from 'src/app/interfaces/Fornecedor';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { FornecedorServiceService } from 'src/app/services/fornecedor-service.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-edit-fornecedor',
  templateUrl: './edit-fornecedor.component.html',
  styleUrls: ['./edit-fornecedor.component.css']
})
export class EditFornecedorComponent implements OnInit {
  listEstadoUf!: EstadoAndUF[];
  fornecedorForm!: FormGroup;
  mensagemError!: string;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  @Input() fornecedor!: Fornecedor;

  constructor(public modal: NgbActiveModal, private mensagemService: MensagensService,
    private compartilhar: CompartilharListService, private fornecedorService: FornecedorServiceService, private datePipe: DatePipe) {
      compartilhar.GetEstadoAndUfList().subscribe(x => this.listEstadoUf = x);
  }

  ngOnInit(): void {
    if(!this.fornecedor){
      this.mensagemService.addMensagemError("Desculpe, fornecedor não encontrado!");
      this.modal.dismiss();
    }
    this.fornecedor.telefone = this.fornecedor.telefone.replace('-', '');
    const dataFormatada = this.datePipe.transform(this.fornecedor.dataFornecedor, "yyyy-MM-dd");
    this.fornecedorForm = new FormGroup({
      id: new FormControl(this.fornecedor.id),
      typePessoa: new FormControl(this.fornecedor.typePessoa),
      nameOrRazaoSocial: new FormControl(this.fornecedor.nameOrRazaoSocial, [Validators.required]),
      dataFornecedor: new FormControl(dataFormatada, [Validators.required]),
      cpf: new FormControl(this.fornecedor.cpf),
      cnpj: new FormControl(this.fornecedor.cnpj),
      email: new FormControl(this.fornecedor.email, [Validators.required]),
      telefone: new FormControl(this.fornecedor.telefone, [Validators.required, Validators.minLength(9)]),
      cep: new FormControl(this.fornecedor.cep, [Validators.required, Validators.minLength(8)]),
      numeroResidencial: new FormControl(this.fornecedor.numeroResidencial, [Validators.required]),
      logradouro: new FormControl(this.fornecedor.logradouro, [Validators.required]),
      ddd: new FormControl(this.fornecedor.ddd, [Validators.required]),
      bairro: new FormControl(this.fornecedor.bairro, [Validators.required]),
      cidade: new FormControl(this.fornecedor.cidade, [Validators.required]),
      estado: new FormControl(this.fornecedor.estado, [Validators.required])
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

  submitEdit() {
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

    this.fornecedorService.Update(data).subscribe({
      next: () => {
        this.onSubmitted.emit();
        this.mensagemService.addMensagemSucesso("Fornecedor editado com sucesso!");
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
