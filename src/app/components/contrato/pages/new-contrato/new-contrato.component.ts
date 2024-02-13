import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteFisico } from 'src/app/interfaces/ClienteFisico';
import { ClienteJuridico } from 'src/app/interfaces/ClienteJuridico';
import { ClientesContrato } from 'src/app/interfaces/ClientesContrato';
import { Contrato } from 'src/app/interfaces/Contrato';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { Onibus } from 'src/app/interfaces/Onibus';
import { ContratoService } from 'src/app/services/contrato.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsultClienteComponent } from '../consult-cliente/consult-cliente.component';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LembreteService } from 'src/app/services/lembrete.service';

@Component({
  selector: 'app-new-contrato',
  templateUrl: './new-contrato.component.html',
  styleUrls: ['./new-contrato.component.css']
})
export class NewContratoComponent implements OnInit {
  contratoForm!: FormGroup;
  selectCliente!: FormGroup;
  pagamentAvista = true;
  motoristaList: Funcionario[] = [];
  onibusList: Onibus[] = [];
  clienteFisicoList: ClienteFisico[] = [];
  clienteJuridicoList: ClienteJuridico[] = [];
  clienteContrato?: ClientesContrato;
  clientesContratoList!: ClientesContrato[];

  constructor(private router: Router, private mensagemService: MensagensService, private contratoService: ContratoService, private modal: NgbModal, private datePipe: DatePipe, private lembreteService: LembreteService) {

  }
  ngOnInit(): void {
    console.log(this.returnDataAtual());
    this.contratoForm = new FormGroup({
      pagament: new FormControl(1, [Validators.required]),
      motoristaId: new FormControl(null, [Validators.required]),
      onibusId: new FormControl(null, [Validators.required]),
      valorMonetario: new FormControl('', [Validators.required]),
      dataEmissao: new FormControl(this.returnDataAtual(), [Validators.required]),
      dataVencimento: new FormControl('', [Validators.required]),
      qtParcelas: new FormControl(''),
      detalhamento: new FormControl('', [Validators.required]),
      clientesSelected: new FormControl(null, [Validators.required])
    });

    this.contratoService.getMotoritasList().subscribe((x) => this.motoristaList = x);
    this.contratoService.getOnibusList().subscribe((x) => this.onibusList = x);
    this.contratoService.getClientesPfList().subscribe((x) => this.clienteFisicoList = x);
    this.contratoService.getClientesPjList().subscribe((x) => this.clienteJuridicoList = x);
  }
  get motoristaId() {
    return this.contratoForm.get('motoristaId')!;
  }
  get onibusId() {
    return this.contratoForm.get('onibusId')!;
  }
  get valorMonetario() {
    return this.contratoForm.get('valorMonetario')!;
  }
  get dataEmissao() {
    return this.contratoForm.get('dataEmissao')!;
  }
  get dataVencimento() {
    return this.contratoForm.get('dataVencimento')!;
  }
  get qtParcelas() {
    return this.contratoForm.get('qtParcelas')!;
  }
  get detalhamento() {
    return this.contratoForm.get('detalhamento')!;
  }
  get clientesContrato() {
    return this.contratoForm.get('valorMonetario')!;
  }
  get pagament() {
    return this.contratoForm.get('pagament')!;
  }
  get clientesSelected() {
    return this.contratoForm.get("clientesSelected")!;
  }

  returnDataAtual() {
    const data: Date = new Date();
    const dia = data.getDate();
    const mes: number = data.getMonth() + 1;
    const ano = data.getFullYear();
    const dataAtual = new Date(ano, mes - 1, dia);
    return this.datePipe.transform(dataAtual, "yyyy-MM-dd");
  }
  submit() {

    if (this.contratoForm.invalid) {
      return;
    }
    const contrato: Contrato = this.contratoForm.value;
    if (this.pagamentAvista) {
      contrato.qtParcelas = 1;
    }
    else if (contrato.qtParcelas < 2) {
      this.mensagemService.addMensagemError("Quantidade de parcelas inválida!");
      return;
    }

    this.clientesContratoList = this.setClientesSelected(this.contratoForm.get("clientesSelected")?.value);
    contrato.pagament = Number(contrato.pagament);

    this.contratoService.AdicionarContrato(contrato, this.clientesContratoList).subscribe({
      next: () => {
        this.mensagemService.addMensagemSucesso("Contrato registrado com sucesso!");
        this.lembreteService.NotificarEvento("start");
        this.router.navigate(["contrato/"]);
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
            const formControl = this.contratoForm.get(this.lowerFirstCaracter(itemErro));
            const erro = { atributo: itemErro, mensagem: listErros[itemErro] };
            console.log(erro);
            erros.push(erro);
            formControl?.setErrors({ serverError: listErros[itemErro] });
          });
        }
      }
    })
  }

  lowerFirstCaracter(str: string): string {
    const [_, secondWord] = str.split('.');
    return secondWord.charAt(0).toLowerCase() + secondWord.slice(1);
  }

  setClientesSelected(list: any[]): ClientesContrato[] {
    const clientesContratoList: ClientesContrato[] = [];
    for (const item of list) {
      const clienteContrato: ClientesContrato = {};
      if (item.cpf) {
        clienteContrato.pessoaFisicaId = item.id;
      } else {
        clienteContrato.pessoaJuridicaId = item.id;
      }
      clientesContratoList.push(clienteContrato);
    } 
    return clientesContratoList;
  }
  
  alternarOpcao() {
    if (this.pagamentAvista) {
      this.pagamentAvista = false;
    }
    else {
      this.pagamentAvista = true;
    }
  }

  FormatarPlaca(placa: string): string {
    const numeros = placa.substring(0, 3);
    const letras = placa.substring(3);
    return `${numeros}-${letras}`;
  }
}
