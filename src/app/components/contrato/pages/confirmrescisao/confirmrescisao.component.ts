import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientesContrato } from 'src/app/interfaces/ClientesContrato';
import { ContratoService } from 'src/app/services/contrato.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-confirmrescisao',
  templateUrl: './confirmrescisao.component.html',
  styleUrls: ['./confirmrescisao.component.css']
})
export class ConfirmrescisaoComponent implements OnInit {
  @Input() clientesContrato!: ClientesContrato;
  constructor(public modal: NgbActiveModal, private datePipe: DatePipe, private contratoService: ContratoService, private mensagemService: MensagensService) {
  }

  ngOnInit(): void {

  }

  ReturnDinheiroFormat(value: number) {
    const styleMoeda = {
      style: 'currency',
      currency: 'BRL'
    }
    return value.toLocaleString('pt-BR', styleMoeda);
  }

  ReturnCpfFormat(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  ReturnCnpjFormat(cnpj: string) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  ReturnDataFormat(value: string) {
    return this.datePipe.transform("dd/MM/yyyy", value);
  }
  ReturnValorMulta(value: number) {
    value = value * this.clientesContrato.contrato!.qtParcelas;
    value = (value * 3) / 100;
    return this.ReturnDinheiroFormat(value);
  }

  async ActionConfirm() {
    const clienteId = (this.clientesContrato.pessoaFisica) ? this.clientesContrato.pessoaFisicaId : this.clientesContrato.pessoaJuridicaId;
    await this.contratoService.confirmRescisao(this.clientesContrato.contratoId!, clienteId!).subscribe({
      next: () => {
        this.mensagemService.addMensagemSucesso("Processo de rescisão realizado com sucesso!");
      },
      error: (error: HttpErrorResponse) => {
        this.mensagemService.addMensagemError(error.error);
      }
    }
    );
    this.modal.close();
  }
}
