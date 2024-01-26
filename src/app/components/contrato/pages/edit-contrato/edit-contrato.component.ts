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
import { ConsultClienteComponent } from '../consult-cliente/consult-cliente.component';
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
  clientesContratoList: ClientesContrato[] = [];

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
          detalhamento: new FormControl(contrato.detalhamento, [Validators.required])
        });

        this.selectCliente = new FormGroup({
          clienteId: new FormControl(null, [Validators.required]),
        });

        this.contratoService.getMotoritasList().subscribe((x) => this.motoristaList = x);
        this.contratoService.getOnibusList().subscribe((x) => {
          this.onibusList = x;
          this.IncluirOnibusIndisponivel(contrato.onibus!);
        });
        this.contratoService.getClientesPfList().subscribe((x) => this.clienteFisicoList = x);
        this.contratoService.getClientesPjList().subscribe((x) => this.clienteJuridicoList = x);
        this.clientesContratoList = contrato.clientesContrato!;
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
  get clienteId() {
    return this.selectCliente.get('clienteId')!;
  }

  submit() {
    if (this.contratoForm.invalid) {
      return;
    }
    if (this.clientesContratoList.length < 1 || !this.clientesContratoList) {
      this.mensagemService.addMensagemError("Não foi selecionado nenhum cliente!");
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

  selecionarCliente() {
    if (this.selectCliente.valid) {
      const id = Number(this.selectCliente.get('clienteId')?.value);
      const clienteExistente = this.clientesContratoList.some(x => x.pessoaFisicaId === id || x.pessoaJuridicaId === id);

      if (clienteExistente) {
        this.mensagemService.addMensagemError("Cliente já selecionado.");
        return;
      }

      const clienteFisico = this.clienteFisicoList.find(x => x.id === id);
      if (clienteFisico) {
        const clientesContrato: ClientesContrato = {
          pessoaFisica: clienteFisico,
          pessoaFisicaId: clienteFisico.id
        };
        this.clientesContratoList.push(clientesContrato);
      } else {
        const clienteJuridico = this.clienteJuridicoList.find(x => x.id === id);
        if (clienteJuridico) {
          const clientesContrato: ClientesContrato = {
            pessoaJuridica: clienteJuridico,
            pessoaJuridicaId: clienteJuridico.id
          };
          this.clientesContratoList.push(clientesContrato);
        }
      }
    }
  }
  deleteClienteFisico(id: number) {
    this.clientesContratoList = this.clientesContratoList.filter((x) => x.pessoaFisicaId != id);
  }
  deleteClienteJuridico(id: number) {
    console.log(id);
    this.clientesContratoList = this.clientesContratoList.filter((x) => x.pessoaJuridicaId != id);
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
  FormatarCpf(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  FormatarCnpj(cnpj: string) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  ConsultarClienteFisico(clienteFisico: ClienteFisico) {
    const styleModal = {
      size: 'lg'
    }
    const modalRef = this.modal.open(ConsultClienteComponent, styleModal);
    modalRef.componentInstance.clienteFisico = clienteFisico;
  }
  ConsultarClienteJuridico(cliente: ClienteJuridico) {
    const styleModal = {
      size: 'lg'
    }
    const modalRef = this.modal.open(ConsultClienteComponent, styleModal);
    modalRef.componentInstance.clienteJuridico = cliente;
  }
}
