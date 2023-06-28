import { Component, OnInit } from '@angular/core';
import { MensagensService } from 'src/app/services/mensagens.service';
import { Router } from '@angular/router';
import { Onibus } from 'src/app/interfaces/Onibus';
import { PaletaCores } from 'src/app/interfaces/PaletaCores'; 
import { OnibusService } from 'src/app/services/onibus.service';
import { PaletaCoresService } from 'src/app/services/paleta-cores.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-new-frota',
  templateUrl: './new-frota.component.html',
  styleUrls: ['./new-frota.component.css']
})
export class NewFrotaComponent implements OnInit {

  onibusForm!: FormGroup;
  onibus!: Onibus;

  paletaForm!: FormGroup;
  paleta!: PaletaCores;
  paletas!: PaletaCores[];

  constructor(public messagesService: MensagensService, private router: Router,
    private onibusService: OnibusService, private paletaService: PaletaCoresService, private compartilhamento: CompartilharListService) {

  }
  ngOnInit(): void {
    this.messagesService.addMensagemInfo("Adicione as cores da frota, caso não tenha sua opção!");

    this.onibusForm = new FormGroup({
      marca: new FormControl('', [Validators.required]),
      nameBus: new FormControl('', [Validators.required]),
      dataFabricacao: new FormControl('', [Validators.required]),
      renavam: new FormControl('', [Validators.required]),
      placa: new FormControl('', [Validators.required]),
      chassi: new FormControl('', [Validators.required]),
      assentos: new FormControl('', [Validators.required]),
      statusOnibus: new FormControl(0),
      corBus: new FormControl('', [Validators.required])
    });

    this.paletaService.GetPaletas().subscribe((itens) => this.paletas = itens);

    this.paletaForm = new FormGroup({
      cor: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  //Get's da interface Onibus.
  get dataFabricacao() {
    return this.onibusForm.get('dataFabricacao')!;
  }
  get marca() {
    return this.onibusForm.get('marca')!;
  }
  get nameBus() {
    return this.onibusForm.get('nameBus')!;
  }
  get renavam() {
    return this.onibusForm.get('renavam')!;
  }
  get placa() {
    return this.onibusForm.get('placa')!;
  }
  get assentos() {
    return this.onibusForm.get('assentos')!;
  }
  get chassi() {
    return this.onibusForm.get('chassi')!;
  }
  get corBus() {
    return this.onibusForm.get('corBus')!;
  }

  //Getters da interface paletaCores.
  get cor() {
    return this.paletaForm.get('cor')!;
  }
  submit() {
    if (this.onibusForm.invalid) {
      this.messagesService.addMensagemError("Ops, consulte os campos para saber o problema!");
      return;
    }
    const data: Onibus = this.onibusForm.value;
    data.placa = data.placa.replace("-", "");
    this.onibusService.CreateOnibus(data).subscribe({
      next: () => {
        this.onibusService.GetOnibusPaginateAtivos(this.compartilhamento.getPaginaAtualOnibus(), true).subscribe((itens) => {
          this.compartilhamento.setTotPaginaOnibus(itens.qtPaginate);
          this.compartilhamento.atualizarOnibus(itens.onibusList);
        });
        this.messagesService.addMensagemSucesso("Registrado com sucesso!");
        this.router.navigate(["/frota"]);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.messagesService.addMensagemError("Desculpe, ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde ou entre em contato com o suporte do sistema.");
          return;
        }
        if (typeof error.error != 'object') {
          this.messagesService.addMensagemError(error.error);
          return;
        }
        const listaErros = error.error.errors;
        const errosFormulario = [];
        if(listaErros){
          Object.keys(listaErros).forEach((nameAtributo) => {
            const formControl = this.onibusForm.get(this.lowerFirstCaracter(nameAtributo));
            const erro = { atributo: nameAtributo, mensagem: listaErros[nameAtributo] };
            errosFormulario.push(erro);
            formControl?.setErrors({ serverError: listaErros[nameAtributo] });
          });
        }
      }
    });
  }
  lowerFirstCaracter(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  submitCor() {
    if (this.paletaForm.invalid) {
      return;
    }
    const data: PaletaCores = this.paletaForm.value;
    this.paletaService.CreatePaleta(data).subscribe({
      next: () => {
        this.paletaService.GetPaletas().subscribe((itens) => this.paletas = itens);
      },
      error: (error: HttpErrorResponse) => {
        const formControl = this.paletaForm.get('cor');
        formControl?.setErrors({ serverError: error.error });
      }
    });
  }

  removeHandlerCor(paleta: PaletaCores) {
    this.paletaService.DeletePaleta(paleta.id!).subscribe({
      next: () => {
        this.paletaService.GetPaletas().subscribe((itens) => this.paletas = itens);
      },
      error: (error: HttpErrorResponse) => {
        window.alert(error.error);
      }
    });
  }
}
