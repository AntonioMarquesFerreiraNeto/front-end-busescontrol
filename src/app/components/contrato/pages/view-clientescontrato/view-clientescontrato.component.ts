import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contrato } from 'src/app/interfaces/Contrato';

@Component({
  selector: 'app-view-clientescontrato',
  templateUrl: './view-clientescontrato.component.html',
  styleUrls: ['./view-clientescontrato.component.css']
})
export class ViewClientescontratoComponent implements OnInit {
  @Input() contrato!: Contrato;

  constructor(public modal: NgbActiveModal){
    this.validaResolucao();
  }

  ngOnInit(): void {
      
  }
  returnCpf(cpf: string){
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  returnCnpj(cnpj: string){
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
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
