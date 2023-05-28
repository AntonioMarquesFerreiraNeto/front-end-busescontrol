import { Component, OnInit, Input, IterableDiffers } from '@angular/core';
import { Router } from '@angular/router';
import { Onibus } from 'src/app/Onibus';
import { OnibusService } from 'src/app/services/onibus.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MensagensService } from 'src/app/services/mensagens.service';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { combineAll } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-gerirstatus-bus',
  templateUrl: './gerirstatus-bus.component.html',
  styleUrls: ['./gerirstatus-bus.component.css']
})
export class GerirStatusBusComponent implements OnInit {

  textStatus: string = "";
  inativar?: boolean;
  @Input() bus!: Onibus;

  constructor(private router: Router, private onibusService: OnibusService, private mensagemService: MensagensService
    , public activeModal: NgbActiveModal, private compartilhamento: CompartilharListService) {
  }
  ngOnInit(): void {
    //Se ele estiver ativo, será inativado e o texto enviado significa a ação do modal.
    if (this.bus.statusOnibus == 0) {
      this.textStatus = "inativar"
      this.inativar! = true;
    } else {
      this.textStatus = "ativar"
      this.inativar! = false;
    }
  }

  ActionHandler(onibus: Onibus) {
    if (this.inativar! == true) {
      this.onibusService.InativarOnibus(onibus.id!).subscribe({
        next: () => {
          this.onibusService.GetOnibusPaginateAtivos(this.compartilhamento.getPaginaAtualOnibus(), true).subscribe((itens) => {
            if (!itens.onibusList.length && (this.compartilhamento.getPaginaAtualOnibus() - 1) !== 0) {
              this.onibusService.GetOnibusPaginateAtivos(this.compartilhamento.getPaginaAtualOnibus() - 1, true).subscribe((response) => {
                this.compartilhamento.setPaginaAtualOnibus(this.compartilhamento.getPaginaAtualOnibus() - 1);
                this.compartilhamento.setTotPaginaOnibus(response.qtPaginate);
                this.compartilhamento.atualizarOnibus(response.onibusList);
              });
            } else {
              this.compartilhamento.atualizarOnibus(itens.onibusList);
              this.compartilhamento.setTotPaginaOnibus(itens.qtPaginate);
            }
          });
          this.mensagemService.addMensagemSucesso("Inativado com sucesso!");
        },
        error: (error: HttpErrorResponse) => {
          this.mensagemService.addMensagemError(error.error);
        }
      });
    }
    else {
      this.onibusService.AtivarOnibus(onibus.id!).subscribe({
        next: () => {
          this.onibusService.GetOnibusPaginateInativos(this.compartilhamento.getPaginaAtualOnibus(), true).subscribe((itens) => {
            if (!itens.onibusList.length && (this.compartilhamento.getPaginaAtualOnibus() - 1) !== 0) {
              this.onibusService.GetOnibusPaginateInativos(this.compartilhamento.getPaginaAtualOnibus() - 1, true).subscribe((response) => {
                this.compartilhamento.setPaginaAtualOnibus(this.compartilhamento.getPaginaAtualOnibus() - 1);
                this.compartilhamento.setTotPaginaOnibus(response.qtPaginate);
                this.compartilhamento.atualizarOnibus(response.onibusList);
              });
            } else {
              this.compartilhamento.atualizarOnibus(itens.onibusList);
              this.compartilhamento.setTotPaginaOnibus(itens.qtPaginate);
            }
          });
          this.mensagemService.addMensagemSucesso("Ativado com sucesso!");
        }, 
        error: (error: HttpErrorResponse) => {
          this.mensagemService.addMensagemError(error.error);
        }
      });
    }
    this.activeModal.dismiss();
  }

  //Métodos de formatação e visualização para usuário.
  ReturnStatusBus(status: number): string {
    if (status == 0) {
      return "Ativo";
    } else {
      return "Inativo"
    }
  }
  ReturnPlacaFormatada(placa: string): string {
    const numeros = placa.substring(0, 3);
    const letras = placa.substring(3);

    return `${numeros}-${letras}`;
  }
}
