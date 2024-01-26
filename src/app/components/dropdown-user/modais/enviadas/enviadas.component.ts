import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Lembrete } from 'src/app/interfaces/Lembrete';
import { Usuario } from 'src/app/interfaces/User';
import { LembreteService } from 'src/app/services/lembrete.service';
import { ConfirmexclusaoComponent } from './confirmexclusao/confirmexclusao.component';

@Component({
  selector: 'app-enviadas',
  templateUrl: './enviadas.component.html',
  styleUrls: ['./enviadas.component.css']
})
export class EnviadasComponent implements OnInit {
  listEnviadas: Lembrete[] = [];
  listCount: number = 0;
  mensagem = "Carregando..."
  @Input() userAuth!: Usuario;
  
  constructor(private lembreteService: LembreteService, public modal: NgbActiveModal, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.lembreteService.GetAllEnviadasByRemetentId(this.userAuth.nameid).subscribe({
      next: (response) => {
        this.listEnviadas = response.list;
        this.listCount = response.listCount;
        if (this.listCount == 0) this.mensagem = "Nenhum registro encontrado.";
      },
      error: () => {
        this.mensagem = "Desculpe, houve um problema ao processar a solicitação."
      }
    });
  }

  ReturnDatePost(data: string) {
    return this.lembreteService.ReturnHoursOrDaysService(data);
  }

  ReturnNivelAcesso(acess: number) {
    switch (acess) {
      case 1: return "Assistentes";
      case 2: return "Administradores";
      case 3: return "Todos";
      default: return "não identificado";
    }
  }

  ReturnCountEnviadas(){
    if(this.listCount == 1) return "1 mensagem enviada por você.";
    else return `${this.listCount} mensagens enviadas por você.`;
  }

  ExcluirMensagem(item: Lembrete){
    const modalOp = { size: 'md' };
    const modalRef = this.modalService.open(ConfirmexclusaoComponent, modalOp);
    modalRef.componentInstance.lembrete = item;
    modalRef.componentInstance.userAuth = this.userAuth;
    this.modal.close();
  }
}
