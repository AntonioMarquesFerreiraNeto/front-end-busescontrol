import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Lembrete } from 'src/app/interfaces/Lembrete';
import { Usuario } from 'src/app/interfaces/User';
import { LembreteService } from 'src/app/services/lembrete.service';
import { ViewlembreteComponent } from './viewmensagem/viewlembrete.component';

@Component({
  selector: 'app-modalmensagens',
  templateUrl: './modalmensagens.component.html',
  styleUrls: ['./modalmensagens.component.css']
})
export class ModalmensagensComponent implements OnInit {
  @Input() usuarioAutenticado!: Usuario;
  listMensagens: Lembrete[] = [];
  txtMensagem = "Carregando..."
  constructor(public modalService: NgbActiveModal, private lembreteService: LembreteService, private modal: NgbModal) {

  }

  ngOnInit(): void {
    this.lembreteService.GetAllLembreteMsg(this.usuarioAutenticado.nameid, this.usuarioAutenticado.role).subscribe({
      next: (list) =>{
        this.listMensagens = list;
        if(!list.length) this.txtMensagem = "Nenhum registro encontrado."
      },
      error: () =>{
        this.txtMensagem = "Desculpe, ocorreu um erro ao processar a solicitação.";
      }
    });
  }

  ReturnHoursOrDays(item: string) {
    return this.lembreteService.ReturnHoursOrDaysService(item);
  }

  ReturnQtsLembretes(){
    if(this.listMensagens.length == 1) return `${this.listMensagens.length} mensagem enviada para você.`
    else return `${this.listMensagens.length} mensagens enviadas para você.`;
  }

  VisualizarMensagem(item: Lembrete){
    const modalOp = {size: 'md'};
    const modalRef = this.modal.open(ViewlembreteComponent, modalOp);
    modalRef.componentInstance.userAuth = this.usuarioAutenticado;
    modalRef.componentInstance.lembrete = item;
    this.modalService.close();
  }
}
