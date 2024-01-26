import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Lembrete } from 'src/app/interfaces/Lembrete';
import { LembreteService } from 'src/app/services/lembrete.service';
import { ModalmensagensComponent } from '../modalmensagens.component';
import { Usuario } from 'src/app/interfaces/User';

@Component({
  selector: 'app-viewlembrete',
  templateUrl: './viewlembrete.component.html',
  styleUrls: ['./viewlembrete.component.css']
})
export class ViewlembreteComponent implements OnInit{
  @Input() lembrete!: Lembrete;
  @Input() userAuth!: Usuario;
  constructor(public modalService: NgbActiveModal, private lembreteService: LembreteService, private datePipe: DatePipe, private modalConfig: NgbModal){

  }

  ngOnInit(): void {

  }

  ReturnHoursOrDays(){
    return this.lembreteService.ReturnHoursOrDaysService(this.lembrete.data!);
  }
  ReturnNivelAcesso(){
    switch(this.lembrete.nivelAcesso){
      case 0: return "Individual";
      case 1: return "Assistentes";
      case 2: return "Administradores";
      default: return "Todos";
    }
  }
  ReturnDestinatario(){
    if(this.lembrete.nivelAcesso == 0) return this.lembrete.funcionario?.name;
    else return this.ReturnNivelAcesso();
  }
  ReturnDatePublication(){
    const formato = 'dd \'de\' LLLL  \'de\' yyyy \'às\' HH:mm\'h\'';
    return this.datePipe.transform(this.lembrete.data, formato, 'pt-BR');
  }

  ReturnModal(){
    const modalOp = {size: 'md'};
    const modalRef = this.modalConfig.open(ModalmensagensComponent, modalOp);
    modalRef.componentInstance.usuarioAutenticado = this.userAuth;
    this.modalService.close();
  }
}
