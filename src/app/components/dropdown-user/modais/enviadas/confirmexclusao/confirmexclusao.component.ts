import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Lembrete } from 'src/app/interfaces/Lembrete';
import { LembreteService } from 'src/app/services/lembrete.service';
import { EnviadasComponent } from '../enviadas.component';
import { Usuario } from 'src/app/interfaces/User';
import { MensagensService } from 'src/app/services/mensagens.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirmexclusao',
  templateUrl: './confirmexclusao.component.html',
  styleUrls: ['./confirmexclusao.component.css']
})
export class ConfirmexclusaoComponent implements OnInit {
  @Input() lembrete!: Lembrete;
  @Input() userAuth!: Usuario;
  constructor(public modalService: NgbActiveModal, private lembreteService: LembreteService, private datePipe: DatePipe, private modal: NgbModal, private mensagemService: MensagensService){

  }

  ngOnInit(): void {
      
  }

  ExcluirMensagem(){
    this.lembreteService.DeleteMensagemById(this.lembrete.id!).subscribe({
      next: () => {
        this.modalService.close();
        this.mensagemService.addMensagemSucesso("Mensagem excluída com sucesso!");
        setTimeout(() => {
          this.ReturnEnviadas();
        }, 2000);
      },
      error: (error: HttpErrorResponse) => {
        window.alert(error.error);
      }
    });
  }

  ReturnHoursOrDate(data: string){
    return this.lembreteService.ReturnHoursOrDaysService(data);
  }

  ReturnNivelAcesso() {
    switch (this.lembrete.nivelAcesso) {
      case 0: return "Individual";
      case 1: return "Assistentes";
      case 2: return "Administradores";
      case 3: return "Todos";
      default: return "não identificado";
    }
  }

  ReturnNameDestinatario(){
    if(this.lembrete.nivelAcesso == 0) return this.lembrete.funcionario?.name;
    else return this.ReturnNivelAcesso();
  }

  ReturnDateFormatada(){
    const formato = 'dd \'de\' MMMM \'de\' yyyy \'às\' HH:mm\'h\''
    const dataFormatada = this.datePipe.transform(this.lembrete.data, formato, 'pt-BR');
    return dataFormatada;
  }

  ReturnEnviadas(){
    const modalOp = { size: 'md' };
    const modalRef = this.modal.open(EnviadasComponent, modalOp);
    modalRef.componentInstance.userAuth = this.userAuth;
    this.modalService.close();
  }
}
