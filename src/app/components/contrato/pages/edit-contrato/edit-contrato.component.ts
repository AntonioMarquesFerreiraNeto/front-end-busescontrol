import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ContratoService } from 'src/app/services/contrato.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { Onibus } from 'src/app/interfaces/Onibus';
import { ClienteFisico } from 'src/app/interfaces/ClienteFisico';
import { ClienteJuridico } from 'src/app/interfaces/ClienteJuridico';
import { ClientesContrato } from 'src/app/interfaces/ClientesContrato';
import { Contrato } from 'src/app/interfaces/Contrato';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-contrato',
  templateUrl: './edit-contrato.component.html',
  styleUrls: ['./edit-contrato.component.css']
})
export class EditContratoComponent implements OnInit {
  loudingActive = true;
  contratoForm!: FormGroup;
  contrato!: Contrato;

  selectCliente!: FormGroup;
  pagamentAvista!: boolean;
  motoristaList: Funcionario[] = [];
  onibusList: Onibus[] = [];
  clienteFisicoList: ClienteFisico[] = [];
  clienteJuridicoList: ClienteJuridico[] = [];
  clienteContrato?: ClientesContrato;
  clientesContratoList: ClientesContrato[]= [];

  constructor(private route: ActivatedRoute, private contratoService: ContratoService, private router: Router,
    private mensagemService: MensagensService, private modal: NgbModal, private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.contratoService.GetContratoById(id).subscribe({
      next: (contrato) => {
        if (contrato.aprovacao == 2) {
          this.mensagemService.addMensagemError("Contratos aprovados não podem ser editados!");
          this.router.navigate(["/contrato"]);
        }
        this.contrato = contrato;
        const dataEmissao = this.datePipe.transform(contrato.dataEmissao, "yyyy-MM-dd");
        const dataVencimento = this.datePipe.transform(contrato.dataVencimento, "yyyy-MM-dd");
        const clientesPfIds = contrato.clientesContrato?.map(x => x.pessoaFisica?.id) || [];
        const clientesPjIds = contrato.clientesContrato?.map(x => x.pessoaJuridica?.id) || [];  
        const clientesPfIdsFiltered = clientesPfIds.filter(id => id !== undefined).map(Number);
        const clientesPjIdsFiltered = clientesPjIds.filter(id => id !== undefined).map(Number);
        this.pagamentAvista = (contrato.pagament == 0) ? false : true;
        this.contratoForm = new FormGroup({
          id: new FormControl(id),
          pagament: new FormControl(contrato.pagament, [Validators.required]),
          motoristaId: new FormControl(contrato.motoristaId, [Validators.required]),
          onibusId: new FormControl(contrato.onibusId, [Validators.required]),
          valorMonetario: new FormControl(contrato.valorMonetario, [Validators.required]),
          dataEmissao: new FormControl(dataEmissao, [Validators.required]),
          dataVencimento: new FormControl(dataVencimento, [Validators.required]),
          qtParcelas: new FormControl(contrato.qtParcelas),
          detalhamento: new FormControl(contrato.detalhamento, [Validators.required]),
          clientesPfSelect: new FormControl(clientesPfIdsFiltered),
          clientesPjSelect: new FormControl(clientesPjIdsFiltered)
        });
        this.contratoService.getMotoritasList().subscribe((x) => this.motoristaList = x);
        this.contratoService.getOnibusList().subscribe((x) => {
          this.onibusList = x;
          this.IncluirOnibusIndisponivel(contrato.onibus!);
        });
        this.contratoService.getClientesContractEditPfList(contrato.id!).subscribe((x) => this.clienteFisicoList = x);
        this.contratoService.getClientesContractEditPjList(contrato.id!).subscribe((x) => this.clienteJuridicoList = x);
        this.loudingActive = false;
      },
      error: (error: HttpErrorResponse) => {
        this.mensagemService.addMensagemError(error.error);
        this.router.navigate(["/contrato"]);
      }
    });
  }
  IncluirOnibusIndisponivel(onibus: Onibus) {
    if (onibus.disponibilidade == 1) {
      this.onibusList.push(onibus);
    }
    return;
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
  get clientesPfSelect() {
    return this.contratoForm.get('clientesPfSelect')!;
  }
  get clientesPjSelect() {
    return this.contratoForm.get('clientesPjSelect')!;
  }

  submit() {
    if (this.contratoForm.invalid) {
      return;
    }
    if (this.contratoForm.get("clientesPfSelect")?.value == '' && this.contratoForm.get("clientesPjSelect")?.value == '') {
      this.mensagemService.addMensagemError("Não foi selecionado nenhum cliente!");
      return;
    }
    const contrato: Contrato = this.contratoForm.value;
    this.setClientesSelecionados();
    if (this.pagamentAvista) {
      contrato.qtParcelas = 1;
    }
    else if (contrato.qtParcelas < 2) {
      this.mensagemService.addMensagemError("Quantidade de parcelas inválida!");
      return;
    }
    contrato.pagament = Number(contrato.pagament);
    this.loudingActive = true;
    this.contratoService.UpdateContrato(contrato, this.clientesContratoList).subscribe({
      next: () => {
        this.loudingActive = false;
        this.mensagemService.addMensagemSucesso("Contrato editado com sucesso!");
        this.router.navigate(["contrato/"]);
      },
      error: (error: HttpErrorResponse) => {
        this.loudingActive = false;
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

  setClientesSelecionados() {
    const clientesPfSelect = this.contratoForm.get("clientesPfSelect")?.value;
    const clientesPjSelect = this.contratoForm.get("clientesPjSelect")?.value;
    for (const item of clientesPfSelect) {
      const clientesContrato: ClientesContrato = {
        pessoaFisicaId: item,
        contratoId: this.contrato.id
      };
      this.clientesContratoList.push(clientesContrato);
    }
    for (const item of clientesPjSelect) {
      const clientesContrato: ClientesContrato = {
        pessoaJuridicaId: item,
        contratoId: this.contrato.id
      };
      this.clientesContratoList.push(clientesContrato);
    }
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
