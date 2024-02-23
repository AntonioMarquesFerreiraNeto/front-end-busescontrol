import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PaletaCores } from 'src/app/interfaces/PaletaCores';
import { PaletaCoresService } from 'src/app/services/paleta-cores.service';
import {FormGroup, FormControl, Validators} from "@angular/forms"
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-modal-gerircores',
  templateUrl: './modal-gerircores.component.html',
  styleUrls: ['./modal-gerircores.component.css']
})
export class ModalGerircoresComponent implements OnInit {
  paletaForm!: FormGroup; 
  paleta!: PaletaCores;
  paletas!: PaletaCores[];
  @Output() listaAtualizada = new EventEmitter<PaletaCores[]>();
  constructor(private paletaService: PaletaCoresService, private modalService: NgbActiveModal, private snackBarService: MatSnackBar){

  }
  
  ngOnInit(): void {
    this.paletaService.GetPaletas().subscribe(itens => this.paletas = itens);
    this.paletaForm = new FormGroup({
      cor: new FormControl("", [Validators.required, Validators.minLength(3)])
    });
  }

  get cor(){
    return this.paletaForm.get("cor")!;
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
        this.snackBarService.open(`${error.error}`, '', {
          duration: 3000,
          horizontalPosition: 'left'
        });
      }
    });
  }

  closerModal(){
    this.modalService.dismiss();
  }

  //Atualizar a lista do formulário que está este modal quando ele for fechado.
  ngOnDestroy() {
    this.listaAtualizada.emit(this.paletas);
  }
}
