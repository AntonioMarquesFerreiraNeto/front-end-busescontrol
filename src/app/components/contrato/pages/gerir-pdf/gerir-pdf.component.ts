import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contrato } from 'src/app/interfaces/Contrato';

@Component({
  selector: 'app-gerir-pdf',
  templateUrl: './gerir-pdf.component.html',
  styleUrls: ['./gerir-pdf.component.css']
})
export class GerirPdfComponent implements OnInit {
  @Input() contrato!: Contrato;

  ngOnInit(): void {
      
  }

  constructor(public modal: NgbActiveModal){

  }

  returnCpf(cpf: string){
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  returnCnpj(cnpj: string){
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }
}
