import { Component, OnInit } from '@angular/core';
import { Onibus } from 'src/app/interfaces/Onibus';
import { ActivatedRoute, Router } from '@angular/router';
import { OnibusService } from 'src/app/services/onibus.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { CompartilharListService } from 'src/app/services/compartilhar-list.service';
import { PaletaCores } from 'src/app/interfaces/PaletaCores';
import { PaletaCoresService } from 'src/app/services/paleta-cores.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalGerircoresComponent } from '../modal-gerircores/modal-gerircores.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-edit-frota',
  templateUrl: './edit-frota.component.html',
  styleUrls: ['./edit-frota.component.css'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class EditFrotaComponent implements OnInit {
  onibusForm!: FormGroup;
  onibusListado!: Onibus;
  loudingActive = true;
  paletaForm!: FormGroup;
  paletas!: PaletaCores[];
  refPag = 1;

  constructor(private route: ActivatedRoute, private router: Router,
    private onibusService: OnibusService, private mensagemService: MensagensService, private compartilhamento: CompartilharListService, private paletaService: PaletaCoresService, private modal: NgbModal) {
  }

  ngOnInit(): void {
    const onibusId = Number(this.route.snapshot.paramMap.get("id"));
    this.refPag = Number(this.route.snapshot.paramMap.get("refPag"));
    this.onibusService.GetOnibusById(onibusId).subscribe({
      next: (item) => {
        this.onibusListado = item;
        this.onibusForm = new FormGroup({
          id: new FormControl(onibusId),
          marca: new FormControl(this.onibusListado ? this.onibusListado.marca : '', [Validators.required]),
          nameBus: new FormControl(this.onibusListado ? this.onibusListado.nameBus : '', [Validators.required]),
          dataFabricacao: new FormControl(this.onibusListado ? this.onibusListado.dataFabricacao : '', [Validators.required]),
          corBus: new FormControl(this.onibusListado ? this.onibusListado.corBus : '', [Validators.required]),
          renavam: new FormControl(this.onibusListado ? this.onibusListado.renavam : '', [Validators.required]),
          placa: new FormControl(this.onibusListado ? this.onibusListado.placa : '', [Validators.required, Validators.minLength(7)]),
          chassi: new FormControl(this.onibusListado ? this.onibusListado.chassi : '', [Validators.required]),
          assentos: new FormControl(this.onibusListado ? this.onibusListado.assentos : '', [Validators.required]),
          statusOnibus: new FormControl(0)
        });
        this.loudingActive = false;
      },
      error: (error) => {
        this.mensagemService.addMensagemError(error.error);
        this.router.navigate(["/frota"]);
      }
    });
    this.paletaService.GetPaletas().subscribe((itens) => this.paletas = itens);
  }

  //getters do onibusForm
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

  submitEdit() {
    if (this.onibusForm.invalid) {
      return;
    }
    this.onibusListado = this.onibusForm.value;
    this.onibusListado.placa = this.onibusListado.placa.replace("-", "");
    this.loudingActive = true;
    this.onibusService.UpdateOnibus(this.onibusListado).subscribe({
      next: () => {
        this.mensagemService.addMensagemSucesso("Atualizado com sucesso!");
        this.router.navigate([`frota`]);
      },
      error: (error: HttpErrorResponse) => {
        this.loudingActive = false;
        if (typeof error.error != 'object') {
          this.mensagemService.addMensagemError(error.error);
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
  
  ShowModalGerirCores(){
    var modalStyle = {
      size: 'lg'
    };
    const modalRef = this.modal.open(ModalGerircoresComponent, modalStyle);
    modalRef.componentInstance.listaAtualizada.subscribe((itens: PaletaCores[]) => {this.paletas = itens});
  }

  PaletaCoresAtualizada(paletas: PaletaCores[]){
    this.paletas = paletas;
  }
}
