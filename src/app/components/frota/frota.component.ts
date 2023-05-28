import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Onibus } from 'src/app/Onibus';
import { OnibusService } from 'src/app/services/onibus.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { GerirStatusBusComponent } from './pages/gerir-status/gerirstatus-bus.component';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-frota',
  templateUrl: './frota.component.html',
  styleUrls: ['./frota.component.css']
})
export class FrotaComponent implements OnInit {
  onibus!: Onibus[];
  tituloPag: string = "Ônibus";
  inativosSelect = false;
  mensagem = "Carregando...";

  constructor(private onibusService: OnibusService, private modalService: NgbModal, public compartilhamento: CompartilharListService, private mensagemService: MensagensService) {
    this.validaResolucao();
  }
  ngOnInit(): void {
    this.onibusService.GetOnibusPaginateAtivos(this.compartilhamento.getPaginaAtualOnibus(), true).subscribe({
      next: (itens) => {
        this.tituloPag = "Ônibus ativos";
        this.onibus = itens.onibusList;
        if (!itens.length) {
          this.mensagem = "Nenhum registro encontrado.";
        }
        this.compartilhamento.setTotPaginaOnibus(itens.qtPaginate);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.mensagemService.addMensagemError("Desculpe, ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde ou entre em contato com o suporte do sistema.");
          this.mensagem = "Desculpe, ocorreu um erro ao processar a solicitação."
        }
      }
    });
    this.compartilhamento.onibus$.subscribe((list) => {
      this.onibus = list;
    });
  }

  GetOnibusAtivos() {
    this.onibusService.GetOnibusPaginateAtivos(1, true).subscribe((itens) => {
      this.tituloPag = "Ônibus ativos";
      this.inativosSelect = false;
      this.compartilhamento.setPaginaAtualOnibus(1);
      this.onibus = itens.onibusList;
      this.compartilhamento.setTotPaginaOnibus(itens.qtPaginate);
    });
  }
  proximoAtivosPaginate() {
    if (this.compartilhamento.getTotPaginaOnibus() == 1) {
      return;
    }
    this.compartilhamento.setPaginaAtualOnibus(this.compartilhamento.getPaginaAtualOnibus() + 1);
    this.onibusService.GetOnibusPaginateAtivos(this.compartilhamento.getPaginaAtualOnibus(), true).subscribe((itens) => {
      this.onibus = itens.onibusList;
    });
  }
  anteriorAtivosPaginate() {
    this.onibusService.GetOnibusPaginateAtivos(this.compartilhamento.getPaginaAtualOnibus(), false).subscribe((itens) => {
      this.onibus = itens.onibusList;
      this.compartilhamento.setPaginaAtualOnibus(this.compartilhamento.getPaginaAtualOnibus() - 1);
    });
  }

  GetOnibusInativos() {
    this.compartilhamento.setPaginaAtualOnibus(1);
    this.onibusService.GetOnibusPaginateInativos(this.compartilhamento.getPaginaAtualOnibus(), true).subscribe((itens) => {
      this.tituloPag = "Ônibus inativos";
      this.inativosSelect = true;
      this.onibus = itens.onibusList;
      this.compartilhamento.setTotPaginaOnibus(itens.qtPaginate);
    });
  }
  proximoInativosPaginate() {
    if (this.compartilhamento.getTotPaginaOnibus() == 1) {
      return;
    }
    this.compartilhamento.setPaginaAtualOnibus(this.compartilhamento.getPaginaAtualOnibus() + 1);
    this.onibusService.GetOnibusPaginateInativos(this.compartilhamento.getPaginaAtualOnibus(), true).subscribe((itens) => {
      this.onibus = itens.onibusList;
    });
  }
  anteriorInativosPaginate() {
    this.onibusService.GetOnibusPaginateInativos(this.compartilhamento.getPaginaAtualOnibus(), false).subscribe((itens) => {
      this.onibus = itens.onibusList;
      this.compartilhamento.setPaginaAtualOnibus(this.compartilhamento.getPaginaAtualOnibus() - 1);
    });
  }

  Delete(onibus: Onibus) {
    this.onibusService.DeteleOnibus(onibus.id!).subscribe();
  }

  AbriModalGerir(onibus: Onibus) {
    const modalOptions: NgbModalOptions = {
      size: 'lg'
    };
    const modalRef = this.modalService.open(GerirStatusBusComponent, modalOptions);
    modalRef.componentInstance.bus = onibus;
  }

  //Métodos de formatação e visualização para usuário.
  FormatarPlaca(placa: string): string {
    const numeros = placa.substring(0, 3);
    const letras = placa.substring(3);
    return `${numeros}-${letras}`;
  }

  larguraMinima = false;
  @HostListener('window:resize', ['$event'])
  validaResolucao() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 600) {
      this.larguraMinima = true
    }
  }
}
