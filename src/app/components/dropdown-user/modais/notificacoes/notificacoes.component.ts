import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Lembrete } from 'src/app/interfaces/Lembrete';
import { Usuario } from 'src/app/interfaces/User';
import { LembreteService } from 'src/app/services/lembrete.service';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.css']
})
export class NotificacoesComponent implements OnInit {
  @Input() usuarioAuth!: Usuario; 
  listNotificacoes: Lembrete[] = [];
  textoInformation = "Carregando..."
  constructor(public modalService: NgbActiveModal, private lembreteService: LembreteService){

  }

  ngOnInit(){
    this.lembreteService.GetAllLembreteNotificacoes(this.usuarioAuth.nameid, this.usuarioAuth.role).subscribe({
      next: (list) =>{
        this.listNotificacoes = list;
        if(!list.length) this.textoInformation = "Nenhum registro encontrado.";
      },
      error: () =>{
        this.textoInformation = "Desculpe, ocorreu um erro ao processar a solicitação.";
      }
    });
  }

  ReturnDaysOrHours(item: string){
    return this.lembreteService.ReturnHoursOrDaysService(item);
  }

  ReturnQtsLembretes(){
    if(this.listNotificacoes.length == 1) return `${this.listNotificacoes.length} notificação enviada para você.`
    else return `${this.listNotificacoes.length} notificações enviadas para você.`;
  }
}
