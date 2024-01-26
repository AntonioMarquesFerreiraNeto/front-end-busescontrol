import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { DatePipe } from '@angular/common';
import { combineAll } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EstadoAndUF } from 'src/app/interfaces/EstadoAndUF';
@Component({
  selector: 'app-edit-funcionario',
  templateUrl: './edit-funcionario.component.html',
  styleUrls: ['./edit-funcionario.component.css']
})
export class EditFuncionarioComponent implements OnInit {
  listEstadoUf!: EstadoAndUF[];
  funcionarioForm!: FormGroup;
  funcionario!: Funcionario;
  loudingActive = true;

  cargos = [
    { value: 0, nome: "Motorista" },
    { value: 1, nome: "Assistente" },
    { value: 2, nome: "Administrador" }
  ];

  constructor(private datePipe: DatePipe, private funcionarioService: FuncionarioService, private route: ActivatedRoute, private router: Router, private mensagemService: MensagensService, private compartilhamento: CompartilharListService) {
    compartilhamento.GetEstadoAndUfList().subscribe(x => this.listEstadoUf = x);
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.funcionarioService.GetFuncionarioById(id).subscribe({
      next: (item) => {
        const dataFormatada = this.datePipe.transform(item.dataNascimento, "yyyy-MM-dd");
        item.dataNascimento = dataFormatada!;
        this.funcionario = item;
        this.funcionario.cargo = Number(item.cargo);
        this.funcionarioForm = new FormGroup({
          id: new FormControl(this.funcionario ? this.funcionario.id : ''),
          name: new FormControl(this.funcionario ? this.funcionario.name : '', [Validators.required]),
          dataNascimento: new FormControl(this.funcionario ? this.funcionario.dataNascimento : '', [Validators.required]),
          cpf: new FormControl(this.funcionario ? this.funcionario.cpf : '', [Validators.required]),
          email: new FormControl(this.funcionario.email ? this.funcionario.email : '', [Validators.required]),
          telefone: new FormControl(this.funcionario ? this.funcionario.telefone : '', [Validators.required]),
          cargo: new FormControl(this.funcionario ? this.funcionario.cargo : '', [Validators.required]),
          cep: new FormControl(this.funcionario ? this.funcionario.cep : '', [Validators.required]),
          complementoResidencial: new FormControl(this.funcionario ? this.funcionario.complementoResidencial : '', [Validators.required]),
          numeroResidencial: new FormControl(this.funcionario ? this.funcionario.numeroResidencial : '', [Validators.required]),
          logradouro: new FormControl(this.funcionario ? this.funcionario.logradouro : '', [Validators.required]),
          ddd: new FormControl(this.funcionario ? this.funcionario.ddd : '', [Validators.required]),
          bairro: new FormControl(this.funcionario ? this.funcionario.bairro : '', [Validators.required]),
          cidade: new FormControl(this.funcionario ? this.funcionario.cidade : '', [Validators.required]),
          estado: new FormControl(this.funcionario ? this.funcionario.estado : null, [Validators.required])
        });
        this.loudingActive = false;
      },
      error: () => {
        this.mensagemService.addMensagemError("Desculpe, funcionário não encontrado!");
        this.router.navigate(["/funcionario"]);
      }
    });
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

  async submitEdit() {
    if (this.funcionarioForm.invalid && !this.funcionarioForm.errors?.["serverError"]) {
      this.mensagemService.addMensagemError("Ops, consulte os campos para saber o problema!");
      return;
    }
    const data: Funcionario = this.funcionarioForm.value;
    data.cpf = data.cpf.replace(/\D/g, '');
    data.telefone = data.telefone.replace('-', '');
    data.cep = data.cep.replace('-', '');
    data.cargo = Number(data.cargo);

    this.loudingActive = true;
    this.funcionarioService.UpdateFuncionario(data).subscribe({
      next: () => {
        this.loudingActive = false;
        this.mensagemService.addMensagemSucesso("Atualizado com sucesso!");
        this.router.navigate(["/funcionario"]);
      },
      error: (error: HttpErrorResponse) => {
        this.loudingActive = false;
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

  buscarByCep() {
    if (this.funcionarioForm.get('cep')?.value == '') {
      this.mensagemService.addMensagemError("Por favor, informe o CEP!");
      return;
    }
    this.compartilhamento.GetEnderecoByCep(this.funcionarioForm.get('cep')?.value).subscribe({
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
}
