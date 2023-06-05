import { Component } from '@angular/core';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private mensagemService: MensagensService){
    mensagemService.addMensagemSucesso("Seja muito bem-vindo ao nosso sistema!");
  }
}
