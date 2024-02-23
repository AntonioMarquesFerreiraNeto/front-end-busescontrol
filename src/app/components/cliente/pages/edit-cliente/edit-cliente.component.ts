import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { ClienteFisico } from 'src/app/interfaces/ClienteFisico';
import { EstadoAndUF } from 'src/app/interfaces/EstadoAndUF';
import { ClienteService } from 'src/app/services/cliente.service';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class EditClienteComponent implements OnInit {
  clienteForm!: FormGroup;
  clientesList!: ClienteFisico[];
  clienteResponsavel!: ClienteFisico;
  listEstadoUf!: EstadoAndUF[];
  loudingActive = true;

  constructor(private route: ActivatedRoute, private router: Router, private clienteService: ClienteService, private mensagemService: MensagensService, private compartilhamento: CompartilharListService, private datePipe: DatePipe) {
    this.clienteService.GetClientesAutorizados().subscribe(itens => this.clientesList = itens);
    compartilhamento.GetEstadoAndUfList().subscribe(list => this.listEstadoUf = list);
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clienteService.GetClienteById(id).subscribe({
      next: (item) => {
        const dataFormatada = this.datePipe.transform(item.dataNascimento, "yyyy-MM-dd");
        if(item.idVinculacaoContratual){
          this.clienteService.GetClienteResponsavel(item.idVinculacaoContratual).subscribe({
            next: (data) => {
              if(data.adimplente == 1){
                this.clientesList.push(data);
              }
            }
          });
        }
        this.clienteForm = new FormGroup({
          id: new FormControl(id),
          name: new FormControl(item.name, Validators.required),
          dataNascimento: new FormControl(dataFormatada, Validators.required),
          cpf: new FormControl(item.cpf, [Validators.required, Validators.minLength(11)]),
          rg: new FormControl(item.rg, Validators.required),
          email: new FormControl(item.email ? item.email : ''),
          telefone: new FormControl(item.telefone, [Validators.required, Validators.minLength(9)]),
          idVinculacaoContratual: new FormControl(item.idVinculacaoContratual),
          nameMae: new FormControl(item.nameMae, [Validators.required]),
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
      error: () => {
        this.mensagemService.addMensagemError("Desculpe, nenhum cliente encontrado!");
        this.router.navigate(["cliente/"]);
      }
    });
  }
  get id(){
    return this.clienteForm.get('id')!;
  }
  get name(){
    return this.clienteForm.get('name')!;
  }
  get dataNascimento() {
    return this.clienteForm.get('dataNascimento')!;
  }
  get cpf() {
    return this.clienteForm.get('cpf')!;
  }
  get rg(){
    return this.clienteForm.get('rg')!;
  }
  get email() {
    return this.clienteForm.get('email')!;
  }
  get telefone() {
    return this.clienteForm.get('telefone')!;
  }
  get idVinculacaoContratual(){
    return this.clienteForm.get('idVinculacaoContratual')!;
  }
  get nameMae(){
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

  submitEdit(){
    if(this.clienteForm.invalid){
      return;
    }

    const cliente : ClienteFisico = this.clienteForm.value;
    cliente.cpf = cliente.cpf.replace(/\D/g, '');
    cliente.telefone = cliente.telefone.replace('-', '');
    cliente.cep = cliente.cep.replace('-', '');
    
    if(cliente.idVinculacaoContratual){
      cliente.idVinculacaoContratual = Number(cliente.idVinculacaoContratual);
    } else{
      cliente.idVinculacaoContratual = undefined;
    }

    this.clienteService.UpdateCliente(cliente).subscribe({
      next: () =>{
        this.mensagemService.addMensagemSucesso("Atualizado com sucesso!");
        this.router.navigate(["cliente/"]);
      }, 
      error: (error: HttpErrorResponse) =>{
        if (typeof error.error != 'object') {
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

  buscarByCep(cep: string){
    if(!cep){
      this.mensagemService.addMensagemError("Informe o CEP para realizar a consulta!");
      return;
    }
    this.compartilhamento.GetEnderecoByCep(cep).subscribe({
      next: (endereco) =>{
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
