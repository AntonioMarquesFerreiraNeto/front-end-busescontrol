import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contrato } from 'src/app/interfaces/Contrato';

@Component({
  selector: 'app-aprovacao-contrato',
  templateUrl: './aprovacao-contrato.component.html',
  styleUrls: ['./aprovacao-contrato.component.css']
})
export class AprovacaoContratoComponent implements OnInit {
  @Input() contrato!: Contrato;
  constructor(public modal: NgbActiveModal){

  }
  ngOnInit(): void {

  }

  AprovarContrato(){
    
  }
  RevogarContrato(){
    
  }
}
