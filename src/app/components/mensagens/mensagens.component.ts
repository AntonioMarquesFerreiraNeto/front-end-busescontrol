import { Component, OnInit } from '@angular/core';
import { MensagensService } from 'src/app/services/mensagens.service';
@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {
  constructor(public mensagensService: MensagensService) {

  }

  ngOnInit(): void {

  }
  CloseMensagemError() {
    this.mensagensService.closeMensagemError();
  }

  CloseMensagemSucesso() {
    this.mensagensService.closeMensagemSucesso();
  }
  CloseMensagemInfo() {
    this.mensagensService.closeMensagemInfo();
  }
}
