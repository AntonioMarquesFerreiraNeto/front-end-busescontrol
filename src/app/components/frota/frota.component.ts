import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Onibus } from 'src/app/interfaces/Onibus';
import { OnibusService } from 'src/app/services/onibus.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { GerirStatusBusComponent } from './pages/gerir-status/gerirstatus-bus.component';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { GerirdisponibilidadeComponent } from './pages/gerirdisponibilidade/gerirdisponibilidade.component';

@Component({
  selector: 'app-frota',
  templateUrl: './frota.component.html',
  styleUrls: ['./frota.component.css']
})
export class FrotaComponent implements OnInit {
  onibus: Onibus[] = [];
  tituloPag: string = "Ônibus";
  inativosSelect = false;
  totPaginas = 1;
  paginaAtual = 1;
  pesquisa = "";
  mensagem = "Carregando...";

  constructor(private route: ActivatedRoute, private onibusService: OnibusService, private modalService: NgbModal, public compartilhamento: CompartilharListService, private mensagemService: MensagensService, private titleService: Title) {
    this.titleService.setTitle("Buses Control - Frota");
    this.validaResolucao();
  }
  ngOnInit(): void {
    this.onibusService.GetOnibusPaginateAtivos(this.paginaAtual, this.pesquisa).subscribe({
      next: (itens) => {
        this.tituloPag = "Ônibus";
        this.onibus = itens.onibusList;
        this.totPaginas = itens.qtPaginate;
        if (!itens.length) {
          this.mensagem = "Nenhum registro encontrado.";
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.mensagemService.addMensagemError("Desculpe, ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde ou entre em contato com o suporte do sistema.");
          this.mensagem = "Desculpe, ocorreu um erro ao processar a solicitação."
        }
      }
    });
  }

  GetOnibusAtivos() {
    this.onibusService.GetOnibusPaginateAtivos(1, this.pesquisa).subscribe((itens) => {
      this.tituloPag = "Ônibus";
      this.inativosSelect = false;
      this.paginaAtual = 1;
      this.onibus = itens.onibusList;
      this.totPaginas = itens.qtPaginate;
    });
  }
  proximoAtivosPaginate() {
    if (this.totPaginas == 1) {
      return;
    }
    this.paginaAtual++;
    this.onibusService.GetOnibusPaginateAtivos(this.paginaAtual, this.pesquisa).subscribe((itens) => {
      this.onibus = itens.onibusList;
    });
  }
  anteriorAtivosPaginate() {
    this.paginaAtual--;
    this.onibusService.GetOnibusPaginateAtivos(this.paginaAtual, this.pesquisa).subscribe((itens) => {
      this.onibus = itens.onibusList;
      this.totPaginas = itens.qtPaginate;
    });
  }

  GetOnibusInativos() {
    this.paginaAtual = 1;
    this.onibusService.GetOnibusPaginateInativos(this.paginaAtual, this.pesquisa).subscribe((itens) => {
      this.tituloPag = "Ônibus";
      this.inativosSelect = true;
      this.onibus = itens.onibusList;
      this.totPaginas = itens.qtPaginate;
    });
  }
  proximoInativosPaginate() {
    if (this.paginaAtual == this.totPaginas) {
      return;
    }
    this.paginaAtual++;
    this.onibusService.GetOnibusPaginateInativos(this.paginaAtual, this.pesquisa).subscribe((itens) => {
      this.onibus = itens.onibusList;
    });
  }
  anteriorInativosPaginate() {
    if (this.paginaAtual == 1) return;
    this.paginaAtual--;
    this.onibusService.GetOnibusPaginateInativos(this.paginaAtual, this.pesquisa).subscribe((itens) => {
      this.onibus = itens.onibusList;
    });
  }

  Delete(onibus: Onibus) {
    this.onibusService.DeteleOnibus(onibus.id!).subscribe();
  }

  AbriModalGerir(onibus: Onibus) {
    const modalOptions: NgbModalOptions = {
      size: 'md'
    };
    const modalRef = this.modalService.open(GerirStatusBusComponent, modalOptions);
    modalRef.componentInstance.bus = onibus;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.AtualizarListFrota();
    });
  }

  AbrirModalDisponibilidade(onibus: Onibus) {
    const modalOp = {
      size: 'md'
    };
    const modalRef = this.modalService.open(GerirdisponibilidadeComponent, modalOp);
    modalRef.componentInstance.bus = onibus;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.AtualizarListFrota();
    });
  }

  AtualizarListFrota() {
    if (!this.inativosSelect) {
      this.onibusService.GetOnibusPaginateAtivos(this.paginaAtual, this.pesquisa).subscribe(x => {
        this.onibus = x.onibusList;
        this.totPaginas = x.qtPaginate;
        if (this.paginaAtual > 1 && this.onibus.length == 0) {
          this.paginaAtual--;
          this.AtualizarListFrota();
        }
      })
    } else {
      this.onibusService.GetOnibusPaginateInativos(this.paginaAtual, this.pesquisa).subscribe(x => {
        this.onibus = x.onibusList;
        this.totPaginas = x.qtPaginate;
        if (this.paginaAtual > 1 && this.onibus.length == 0) {
          this.paginaAtual--;
          this.AtualizarListFrota();
        }
      })
    }
  }
  //Métodos de formatação e visualização para usuário.
  FormatarPlaca(placa: string): string {
    const numeros = placa.substring(0, 3);
    const letras = placa.substring(3);
    return `${numeros}-${letras}`;
  }

  Pesquisar(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.pesquisa = input.value;
    this.paginaAtual = 1;
    if (!this.inativosSelect) {
      this.onibusService.GetOnibusPaginateAtivos(this.paginaAtual, this.pesquisa).subscribe({
        next: (itens) => {
          this.onibus = itens.onibusList;
          this.totPaginas = itens.qtPaginate;
          if (itens.fornecedorList.length == 0) this.mensagem = "Nenhum registro encontrado.";
        }
      });
    } else {
      this.onibusService.GetOnibusPaginateInativos(this.paginaAtual, this.pesquisa).subscribe({
        next: (itens) => {
          this.onibus = itens.onibusList;
          this.totPaginas = itens.qtPaginate;
          if (itens.fornecedorList.length == 0) this.mensagem = "Nenhum registro encontrado.";
        }
      });
    }
  }

  trueContratosEmAndamento(item: Onibus): boolean {
    const contratos = item.contratos!.some(x => x.andamento === 1);
    return (contratos) ? true : false;
  }

  ReturnCorDisponibilidade(value: number) {
    return (value == 0) ? "link-verde" : "link-orange";
  }
  ReturnIconDisponibilidade(value: number) {
    return (value == 0) ? "fa-solid fa-toggle-on" : "fa-solid fa-toggle-off";
  }
  larguraMinima = false;
  @HostListener('window:resize', ['$event'])
  validaResolucao() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 800) {
      this.larguraMinima = true
    } else {
      this.larguraMinima = false;
    }
  }
}
