import { Component, OnInit } from '@angular/core';
import { Onibus } from 'src/app/Onibus';
import { OnibusService } from 'src/app/services/onibus.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { GerirStatusBusComponent } from './pages/gerir-status/gerirstatus-bus.component';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';


@Component({
  selector: 'app-frota',
  templateUrl: './frota.component.html',
  styleUrls: ['./frota.component.css']
})
export class FrotaComponent implements OnInit {
  onibus!: Onibus[];
  tituloPag!: string;
  inativosSelect = false;
  primeiraPag = false;

  constructor(private onibusService: OnibusService, private modalService: NgbModal, public compartilhamento: CompartilharListService) {

  }
  ngOnInit(): void {
    this.onibusService.GetOnibusPaginateAtivos(this.compartilhamento.getPaginaAtual(), true).subscribe((itens) => {
      this.tituloPag = "Ônibus ativos";
      this.onibus = itens.onibusList;
      this.compartilhamento.setTotPagina(itens.qtPaginate);
    });
    this.compartilhamento.onibus$.subscribe((list) => {
      this.onibus = list;
    });
  }

  GetOnibusAtivos() {
    this.onibusService.GetOnibusPaginateAtivos(1, true).subscribe((itens) => {
      this.tituloPag = "Ônibus ativos";
      this.inativosSelect = false;
      this.compartilhamento.setPaginaAtual(1);
      this.onibus = itens.onibusList;
      this.compartilhamento.setTotPagina(itens.qtPaginate);
    });
  }
  proximoAtivosPaginate() {
    if (this.compartilhamento.getTotPagina() == 1) {
      return;
    }
    this.compartilhamento.setPaginaAtual(this.compartilhamento.getPaginaAtual() + 1);
    this.onibusService.GetOnibusPaginateAtivos(this.compartilhamento.getPaginaAtual(), true).subscribe((itens) => {
      this.onibus = itens.onibusList;
    });
  }
  anteriorAtivosPaginate() {
    this.onibusService.GetOnibusPaginateAtivos(this.compartilhamento.getPaginaAtual(), false).subscribe((itens) => {
      this.onibus = itens.onibusList;
      this.compartilhamento.setPaginaAtual(this.compartilhamento.getPaginaAtual() - 1);
    });
  }

  GetOnibusInativos() {
    this.compartilhamento.setPaginaAtual(1);
    this.onibusService.GetOnibusPaginateInativos(this.compartilhamento.getPaginaAtual(), true).subscribe((itens) => {
      this.tituloPag = "Ônibus inativos";
      this.inativosSelect = true;
      this.onibus = itens.onibusList;
      this.compartilhamento.setTotPagina(itens.qtPaginate);
    });
  }
  proximoInativosPaginate() {
    if (this.compartilhamento.getTotPagina() == 1) {
      return;
    }
    this.compartilhamento.setPaginaAtual(this.compartilhamento.getPaginaAtual() + 1);
    this.onibusService.GetOnibusPaginateInativos(this.compartilhamento.getPaginaAtual(), true).subscribe((itens) => {
      this.onibus = itens.onibusList;
    });
  }
  anteriorInativosPaginate() {
    this.onibusService.GetOnibusPaginateInativos(this.compartilhamento.getPaginaAtual(), false).subscribe((itens) => {
      this.onibus = itens.onibusList;
      this.compartilhamento.setPaginaAtual(this.compartilhamento.getPaginaAtual() - 1);
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
}
