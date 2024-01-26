import { Component, OnInit, Input, HostListener, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientesContrato } from 'src/app/interfaces/ClientesContrato';
import { Contrato } from 'src/app/interfaces/Contrato';
import { ContratoService } from 'src/app/services/contrato.service';
import { ConfirmrescisaoComponent } from '../confirmrescisao/confirmrescisao.component';
import { Usuario } from 'src/app/interfaces/User';
import { HttpErrorResponse } from '@angular/common/http';
import { LembreteService } from 'src/app/services/lembrete.service';

@Component({
  selector: 'app-gerir-pdf',
  templateUrl: './gerir-pdf.component.html',
  styleUrls: ['./gerir-pdf.component.css']
})
export class GerirPdfComponent implements OnInit {

  @Input() contrato!: Contrato;
  usuarioAutenticado!: Usuario;

  ngOnInit(): void {

  }

  constructor(public modal: NgbActiveModal, private contratoService: ContratoService, private cdRef: ChangeDetectorRef, private openModal: NgbModal, private lembreteService: LembreteService) {
    this.validaResolucao();
    this.usuarioAutenticado = JSON.parse(localStorage.getItem("usuarioAutenticado")!);
  }

  returnCpf(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  returnCnpj(cnpj: string) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }

  downloadContratoPF(clienteId: number) {
    this.contratoService.downloadContratoCliente(this.contrato.id!, clienteId, 0).subscribe((response) => {
      let url = window.URL.createObjectURL(response);
      let a = document.createElement('a');
      a.href = url;
      let name = this.contrato.clientesContrato?.find(x => x.pessoaFisicaId == clienteId)?.pessoaFisica?.name;
      a.download = `Contrato - ${name}`;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }
  downloadContratoPJ(clienteId: number) {
    this.contratoService.downloadContratoCliente(this.contrato.id!, 0, clienteId).subscribe({
      next: (response) => {
        let url = window.URL.createObjectURL(response);
        let a = document.createElement('a');
        a.href = url;
        let name = this.contrato.clientesContrato?.find(x => x.pessoaJuridicaId == clienteId)?.pessoaJuridica?.nomeFantasia;
        a.download = `Contrato - ${name}`;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    });
  }

  downloadPdfRescisao(item: ClientesContrato) {
    item.processRescisao = 1;
    this.contratoService.downloadPdfRescisao(item.id!).subscribe({
      next: (response) => {
        let url = window.URL.createObjectURL(response);
        let a = document.createElement('a');
        a.href = url;
        if (item.pessoaFisica) {
          a.download = `Rescisão - ${item.pessoaFisica.name}`;
        } else {
          a.download = `Rescisão - ${item.pessoaJuridica?.nomeFantasia}`;
        }
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        this.lembreteService.NotificarEvento("start");
      }
    });
  }

  confirmRescisaoContrato(clientesContrato: ClientesContrato) {
    clientesContrato.contrato = this.contrato;
    const styleModal = {
      size: 'md'
    };
    this.modal.close();
    const modalRef = this.openModal.open(ConfirmrescisaoComponent, styleModal);
    modalRef.componentInstance.clientesContrato = clientesContrato;
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
