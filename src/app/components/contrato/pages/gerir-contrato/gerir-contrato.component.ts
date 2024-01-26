import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contrato } from 'src/app/interfaces/Contrato';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-gerir-contrato',
  templateUrl: './gerir-contrato.component.html',
  styleUrls: ['./gerir-contrato.component.css']
})
export class GerirContratoComponent implements OnInit {
  @Input() contrato!: Contrato;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  tituloPag!: string;
  textoDescricao!: string;

  ngOnInit(): void {
    this.tituloPag = (this.contrato.statusContrato == 0) ? "Confirmação" : "Consulta";
    this.textoDescricao = (this.contrato.statusContrato == 0) ? "Deseja realmente inativar este contrato?" : `Consulta de contrato Nº ${this.contrato.id}: `;
  }

  constructor(public modal: NgbActiveModal, private datePipe: DatePipe, private contratoService: ContratoService,
    private mensagemService: MensagensService, private compartilhamento: CompartilharListService) {

  }

  ActionModal() {
    if (this.contrato.id) {
      this.contratoService.InativarContrato(this.contrato.id).subscribe({
        next: () => {
          this.mensagemService.addMensagemSucesso("Contrato inativado com sucesso!");
          this.onSubmitted.emit();
          this.modal.dismiss();
        },
        error: (error: HttpErrorResponse) => {
          this.mensagemService.addMensagemError(error.error);
          this.modal.dismiss();
        }
      });
    }
  }

  ReturnPlacaFormatada(placa: string): string {
    const numeros = placa.substring(0, 3);
    const letras = placa.substring(3);

    return `${numeros}-${letras}`;
  }
  ReturnValor() {
    const money = this.contrato.valorMonetario.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' });
    return money;
  }
  ReturnPagamento() {
    if (this.contrato.pagament != 0) {
      return "À vista"
    } else {
      return "Parcelado"
    }
  }
  ReturnCpf() {
    const cpf = this.contrato.motorista?.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return cpf;
  }
  ReturnQtParcelas() {
    const qtParcelas = (this.contrato.pagament == 0) ? `${this.contrato.qtParcelas}` : "Modelo de pagamento único";
    return qtParcelas;
  }
  ReturnDate(date: string) {
    const dataFormatada = this.datePipe.transform(date, "dd/MM/yyyy");
    return dataFormatada;
  }
}
