import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contrato } from 'src/app/interfaces/Contrato';
import { ContratoService } from 'src/app/services/contrato.service';

@Component({
  selector: 'app-gerir-pdf',
  templateUrl: './gerir-pdf.component.html',
  styleUrls: ['./gerir-pdf.component.css']
})
export class GerirPdfComponent implements OnInit {

  @Input() contrato!: Contrato;

  ngOnInit(): void {
      
  }

  constructor(public modal: NgbActiveModal, private contratoService: ContratoService){

  }

  returnCpf(cpf: string){
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  returnCnpj(cnpj: string){
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }

  downloadContratoPF(clienteId: number){
    this.contratoService.downloadContratoCliente(this.contrato.id!, clienteId, 0);
  }
  downloadContratoPJ(clienteId: number){
    this.contratoService.downloadContratoCliente(this.contrato.id!, 0, clienteId);
  }
}
