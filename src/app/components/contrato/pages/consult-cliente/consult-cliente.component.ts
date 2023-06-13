import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteFisico } from 'src/app/interfaces/ClienteFisico';
import { ClienteJuridico } from 'src/app/interfaces/ClienteJuridico';

@Component({
  selector: 'app-consult-cliente',
  templateUrl: './consult-cliente.component.html',
  styleUrls: ['./consult-cliente.component.css']
})
export class ConsultClienteComponent implements OnInit {
  @Input() clienteFisico!: ClienteFisico;
  @Input() clienteJuridico!: ClienteJuridico;

  constructor(public activeModal: NgbActiveModal, private datePipe: DatePipe){

  }

  ngOnInit(): void {

  }

  ReturnCpfFormatado(cpf: string){
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  ReturnDateCliente(date: string){
    return this.datePipe.transform(date, "dd/MM/yyyy");
  }

  ReturnCnpjFormatado(cnpj: string){
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  ReturnTelFormatado(tel: string){
    return tel.replace(/(\d{5})(\d{4})/, '$1-$2');
  }
}
