import { Component, OnInit, Input, HostListener, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModaluserauthComponent } from './modais/modaluserauth/modaluserauth.component';
import { NotificacoesComponent } from './modais/notificacoes/notificacoes.component';
import { ModalmensagensComponent } from './modais/modalmensagens/modalmensagens.component';
import { EnviarMensagemComponent } from './modais/enviar-mensagem/enviar-mensagem.component';
import { LembreteService } from 'src/app/services/lembrete.service';
import { EnviadasComponent } from './modais/enviadas/enviadas.component';

@Component({
  selector: 'app-dropdown-user',
  templateUrl: './dropdown-user.component.html',
  styleUrls: ['./dropdown-user.component.css']
})
export class DropdownUserComponent implements OnInit {
  @Input() display_dropdown!: boolean;
  @Input() larguraMinima!: boolean;
  @Input() usuarioAutenticado!: any;
  @Output() closeDropdown = new EventEmitter<void>();

  qtLembreteMensagem!: number;
  qtLembreteNoti!: number;

  constructor(private modal: NgbModal, private elementRef: ElementRef, private renderer: Renderer2, private lembreteService: LembreteService) {
  }
  ngOnInit(): void {
    this.ReturnCountsLembretes();
    this.lembreteService.obterEventoNotificacao().subscribe(() => {
      this.ReturnCountsLembretes();
    });
  }
  OpenModalUserAuth() {
    this.FecharDropdown();
    const modalConfig = { size: 'md' };
    const modalRef = this.modal.open(ModaluserauthComponent, modalConfig);
    modalRef.componentInstance.usuarioAutenticado = this.usuarioAutenticado;
  }
  OpenModalNotificacoes() {
    this.FecharDropdown();
    const modalConfig = { size: "md" };
    const modalRef = this.modal.open(NotificacoesComponent, modalConfig);
    modalRef.componentInstance.usuarioAuth = this.usuarioAutenticado;
  }
  OpenModalMensagens() {
    this.FecharDropdown();
    const modalOptions = { size: 'md' };
    const modalRef = this.modal.open(ModalmensagensComponent, modalOptions);
    modalRef.componentInstance.usuarioAutenticado = this.usuarioAutenticado;
  }
  OpenEnviarMensagem() {
    this.FecharDropdown();
    const modalOptions = { size: 'md' };
    const modalRef = this.modal.open(EnviarMensagemComponent, modalOptions);
    modalRef.componentInstance.usuarioAutenticado = this.usuarioAutenticado;
  }

  OpenEnviadas(){
    this.FecharDropdown();
    const modalOp = { size: 'md' };
    const modalRef = this.modal.open(EnviadasComponent, modalOp);
    modalRef.componentInstance.userAuth = this.usuarioAutenticado;
  }

  FecharDropdown() {
    this.closeDropdown.emit();
  }

  ReturnCountsLembretes() {
    this.lembreteService.GetCountLembreteNotificacoes(this.usuarioAutenticado.nameid, this.usuarioAutenticado.role).subscribe(data => {
      this.qtLembreteNoti = data;
    });
    this.lembreteService.GetCountLembreteMsg(this.usuarioAutenticado.nameid, this.usuarioAutenticado.role).subscribe(data => {
      this.qtLembreteMensagem = data;
    });
  }
}
