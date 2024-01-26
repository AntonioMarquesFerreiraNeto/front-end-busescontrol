import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contrato } from 'src/app/interfaces/Contrato';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { Onibus } from 'src/app/interfaces/Onibus';
import { SubContratoMotorista } from 'src/app/interfaces/SubContratoMotorista';
import { SubContratoOnibus } from 'src/app/interfaces/SubContratoOnibus';
import { ContratoService } from 'src/app/services/contrato.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-substituicoes',
  templateUrl: './substituicoes.component.html',
  styleUrls: ['./substituicoes.component.css']
})
export class SubstituicoesComponent implements OnInit {

  @Input() contrato!: Contrato;
  motoristaList: Funcionario[] = [];
  onibusList: Onibus[] = [];
  motoristaSubForm!: FormGroup;
  onibusSubForm!: FormGroup;
  mensagemError = "";
  mensagemSucesso = "";
  listarOnibus: boolean = false;
  constructor(protected modalService: NgbActiveModal, private contratoService: ContratoService, private mensagemService: MensagensService, private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    if (!this.contrato) this.modalService.close();
    this.contratoService.GetContratoById(this.contrato.id!).subscribe(x => {
      this.contrato.subContratoMotoristas = x.subContratoMotoristas;
      this.contrato.subContratoOnibus = x.subContratoOnibus;
    });
    this.contratoService.getMotoritasList().subscribe(x => this.motoristaList = x);
    this.contratoService.getOnibusList().subscribe(x => this.onibusList = x);

    //Formulário de motorista.
    this.motoristaSubForm = new FormGroup({
      id: new FormControl(0),
      funcionarioId: new FormControl(null, Validators.required),
      dataInicial: new FormControl('', Validators.required),
      dataFinal: new FormControl('', Validators.required)
    });
    //Formulário de ônibus.
    this.onibusSubForm = new FormGroup({
      id: new FormControl(0),
      onibusId: new FormControl(null, Validators.required),
      dataInicial: new FormControl('', Validators.required),
      dataFinal: new FormControl('', Validators.required)
    });
  }
  IncluirOnibusIndisponivel(onibus: Onibus){
    if(onibus.disponibilidade == 1){
      this.onibusList.push(onibus);
    }
  }

  //Funções de motorista.
  submitFormMotorista() {
    if (this.motoristaSubForm.invalid) {
      this.AddMensagemError("Todos os campos são obrigatórios!");
      return;
    }
    const data: SubContratoMotorista = this.motoristaSubForm.value;
    data.funcionarioId = Number(data.funcionarioId);
    if (this.validacoes(data)) return;
    data.contratoId = this.contrato.id!;

    if (this.motoristaSubForm.get('id')?.value == 0) {
      this.contratoService.NewSubContratoMotorista(data).subscribe({
        next: (response) => {
          this.AddMensagemSucesso("Substituição adicionada com sucesso!");
          this.contrato = response;
        },
        error: (error: HttpErrorResponse) => {
          this.AddMensagemError(error.error);
        }
      });
    } else {
      this.contratoService.UpdateSubContratoMotorista(data).subscribe({
        next: (response) => {
          this.AddMensagemSucesso("Substituição editada com sucesso!");
          this.contrato = response;
        },
        error: (error: HttpErrorResponse) => {
          this.AddMensagemError(error.error);
        }
      });
    }
  }

  //Funções de ônibus.
  submitFormBus() {
    if (this.onibusSubForm.invalid) {
      this.AddMensagemError("Todos os campos são obrigatórios!");
      return;
    }
    const data: SubContratoOnibus = this.onibusSubForm.value;
    data.onibusId = Number(data.onibusId);
    if (this.validacoes(undefined, data)) return;
    data.contratoId = this.contrato.id!;

    if (this.onibusSubForm.get('id')?.value == 0) {
      this.contratoService.NewSubContratoOnibus(data).subscribe({
        next: (data) => {
          this.AddMensagemSucesso("Substituição adicionada com sucesso!");
          this.contrato = data;
        },
        error: (error: HttpErrorResponse) => {
          this.AddMensagemError(error.error);
        }
      });
    } else {
      this.contratoService.UpdateSubContratoOnibus(data).subscribe({
        next: (response) => {
          this.contrato = response;
          this.AddMensagemSucesso("Substituição editada com sucesso!");
        },
        error: (error: HttpErrorResponse) => {
          this.AddMensagemError(error.error);
        }
      });
    }
  }

  //Funções compartilhadas.
  validacoes(dataMotorista?: SubContratoMotorista, dataOnibus?: SubContratoOnibus): boolean {
    if (dataMotorista) {
      if (dataMotorista!.dataInicial < this.contrato.dataEmissao || dataMotorista!.dataFinal > this.contrato.dataVencimento) {
        this.AddMensagemError("As datas das substituições devem corresponder às datas do contrato!");
        return true;
      }
      if (dataMotorista!.funcionarioId == this.contrato.motoristaId) {
        this.AddMensagemError("Motorista já está vinculado como principal no contrato!");
        return true;
      }
      return false;
    }
    else {
      if (dataOnibus!.dataInicial < this.contrato.dataEmissao || dataOnibus!.dataFinal > this.contrato.dataVencimento) {
        this.AddMensagemError("As datas das substituições devem corresponder às datas do contrato!");
        return true;
      }
      if (dataOnibus!.onibusId == this.contrato.onibusId) {
        this.AddMensagemError("Ônibus já está vinculado como principal no contrato!");
        return true;
      }
      return false;
    }
  }
  EditGetDados(id: number) {
    if (!this.listarOnibus) {
      const data: SubContratoMotorista = this.contrato.subContratoMotoristas?.find(x => x.id == id)!;
      console.log(data);
      this.motoristaSubForm.get('id')?.setValue(data.id);
      this.motoristaSubForm.get('funcionarioId')?.setValue(data.funcionarioId);
      this.motoristaSubForm.get('dataInicial')?.setValue(this.DateFormatInput(data.dataInicial));
      this.motoristaSubForm.get('dataFinal')?.setValue(this.DateFormatInput(data.dataFinal));
    } else {
      const data: SubContratoOnibus = this.contrato.subContratoOnibus?.find(x => x.id == id)!;
      this.IncluirOnibusIndisponivel(data.onibus!);
      this.onibusSubForm.get('id')?.setValue(data.id);
      this.onibusSubForm.get('onibusId')?.setValue(data.onibusId);
      this.onibusSubForm.get('dataInicial')?.setValue(this.DateFormatInput(data.dataInicial));
      this.onibusSubForm.get('dataFinal')?.setValue(this.DateFormatInput(data.dataFinal));
    }
  }
  RemoveMotoristaSub(id: number) {
    if (!this.listarOnibus) {
      this.contratoService.RemoveSubContratoMotorista(id).subscribe({
        next: (data) => {
          this.contrato = data;
          this.AddMensagemSucesso("Substituição removida com sucesso!");
        },
        error: (error: HttpErrorResponse) => {
          this.AddMensagemError(error.error);
        }
      });
    } else {
      this.contratoService.RemoveSubContratoOnibus(id).subscribe({
        next: (response) => {
          this.contrato = response;
          this.AddMensagemSucesso("Substituição removida com sucesso!");
        },
        error: (error: HttpErrorResponse) => {
          this.AddMensagemError(error.error);
        }
      });
    }
  }
  LimparFormulario() {
    if (!this.listarOnibus) {
      this.motoristaSubForm.reset();
      this.motoristaSubForm.get('funcionarioId')?.setValue(null);
      this.motoristaSubForm.get('id')?.setValue(0);
      this.AddMensagemSucesso("Formulário resetado com sucesso.")
    } else {
      this.onibusSubForm.reset();
      this.onibusSubForm.get('onibusId')?.setValue(null);
      this.onibusSubForm.get('id')?.setValue(0);
      this.AddMensagemSucesso("Formulário resetado com sucesso.")
    }
  }

  AddMensagemError(msg: string) {
    this.mensagemError = msg;
    this.mensagemSucesso = "";
    setTimeout(() => {
      this.mensagemError = "";
    }, 5200);
  }
  AddMensagemSucesso(msg: string) {
    this.mensagemSucesso = msg;
    this.mensagemError = "";
    setTimeout(() => {
      this.mensagemSucesso = "";
    }, 5200);
  }
  ReturnDataFormatada(date: string) {
    const dataFormatada = this.datePipe.transform(date, "dd/MM/yyyy");
    return dataFormatada;
  }
  DateFormatInput(date: string) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  AlterarListagem(event: Event) {
    if (this.listarOnibus) this.listarOnibus = false;
    else this.listarOnibus = true;
  }
  FormatarPlaca(placa: string): string {
    const numeros = placa.substring(0, 3);
    const letras = placa.substring(3);
    return `${numeros}-${letras}`;
  }
}
