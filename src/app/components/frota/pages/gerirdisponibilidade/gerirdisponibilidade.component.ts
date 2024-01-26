import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OnibusService } from 'src/app/services/onibus.service';
import { Onibus } from 'src/app/interfaces/Onibus';
import { HttpErrorResponse } from '@angular/common/http';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-gerirdisponibilidade',
  templateUrl: './gerirdisponibilidade.component.html',
  styleUrls: ['./gerirdisponibilidade.component.css']
})
export class GerirdisponibilidadeComponent implements OnInit {
  @Input() bus!: Onibus;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  txtAction!: string;
  constructor(public modalService: NgbActiveModal, private frotaService: OnibusService, private mensagemService: MensagensService){

  }

  ngOnInit(): void {
    this.txtAction = (this.bus.disponibilidade == 0) ? "indisponível" : "disponível";
  }
  ReturnDisponibilidade(){
    return (this.bus.disponibilidade == 0) ?  "disponível" : "indisponível";
  }
  ReturnPlacaFormatada(){
    let data : string = this.bus.placa;
    return data.replace(/(\w{3})(\d{4})/,"$1-$2");
  }

  async SubmitModal(){
    await (this.bus.disponibilidade == 0) ? this.Desabilitar(this.bus.id!) : this.Habilitar(this.bus.id!);
    this.modalService.close();
  }
  Habilitar(id: number){
    this.frotaService.HabilitarDisponibilidade(id).subscribe({
      next: () =>{
        this.onSubmitted.emit();
        this.mensagemService.addMensagemSucesso("Ônibus disponível para novos contratos!");
      }, 
      error: (error: HttpErrorResponse) =>{
        this.mensagemService.addMensagemError(error.error);
      }
    });
  }
  Desabilitar(id: number){
    this.frotaService.DesabilitarDisponibilidade(id).subscribe({
      next: () =>{
        this.onSubmitted.emit();
        this.mensagemService.addMensagemSucesso("Ônibus indisponível para novos contratos!");
      }, 
      error: (error: HttpErrorResponse) =>{
        this.mensagemService.addMensagemError(error.error);
      }
    });
  }
}
