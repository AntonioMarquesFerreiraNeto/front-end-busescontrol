import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteFisico } from 'src/app/interfaces/ClienteFisico';
import { ClienteJuridico } from 'src/app/interfaces/ClienteJuridico';
import { ClientesContrato } from 'src/app/interfaces/ClientesContrato';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { Onibus } from 'src/app/interfaces/Onibus';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-new-contrato',
  templateUrl: './new-contrato.component.html',
  styleUrls: ['./new-contrato.component.css']
})
export class NewContratoComponent implements OnInit {
  contratoForm!: FormGroup;
  motoristaList: Funcionario[] = [];
  onibusList: Onibus[] = [];
  clienteFisicoList: ClienteFisico[] = [];
  clienteJuridicoList: ClienteJuridico[] = [];
  clientesContratoList: ClientesContrato[] = [];

  constructor(private router: Router, private mensagemService: MensagensService){

  }

  ngOnInit(): void {
    this.contratoForm = new FormGroup({
      motoristaId: new FormControl('', [Validators.required]),
      onibusId: new FormControl('', [Validators.required]),
      valorMonetario: new FormControl('', [Validators.required]),
      dataEmissao: new FormControl('', [Validators.required]),
      dataVencimento: new FormControl('', [Validators.required]),
      qtParcelas: new FormControl('', [Validators.required]),
      detalhadamento:  new FormControl('', [Validators.required]),
      clientesContrato: new FormControl('', [Validators.required])
    });
  }
  get motoristaId(){
    return this.contratoForm.get('motoristaId')!;
  }
  get onibusId(){
    return this.contratoForm.get('onibusId')!;
  }
  get valorMonetario(){
    return this.contratoForm.get('valorMonetario')!;
  }
  get dataEmissao(){
    return this.contratoForm.get('dataEmissao')!;
  }
  get dataVencimento(){
    return this.contratoForm.get('dataVencimento')!;
  }
  get qtParcelas(){
    return this.contratoForm.get('qtParcelas')!;
  }
  get detalhadamento(){
    return this.contratoForm.get('detalhadamento')!;
  }
  get clientesContrato(){
    return this.contratoForm.get('valorMonetario')!;
  }

  submit(){

  }
}
