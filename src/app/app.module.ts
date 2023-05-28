import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FrotaComponent } from './components/frota/frota.component';
import { NewFrotaComponent } from './components/frota/pages/new-frota/new-frota.component';
import { MensagensComponent } from './components/mensagens/mensagens.component';
import { GerirStatusBusComponent } from './components/frota/pages/gerir-status/gerirstatus-bus.component';
import { EditFrotaComponent } from './components/frota/pages/edit-frota/edit-frota.component';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { FornecedorComponent } from './components/fornecedor/fornecedor.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { FinanceiroComponent } from './components/financeiro/financeiro.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { NewFuncionarioComponent } from './components/funcionario/pages/new-funcionario/new-funcionario.component';
import { EditFuncionarioComponent } from './components/funcionario/pages/edit-funcionario/edit-funcionario.component';
import { GerirFuncionarioComponent } from './components/funcionario/pages/gerir-funcionario/gerir-funcionario.component';
import { GerirUsuarioComponent } from './components/funcionario/pages/gerir-usuario/gerir-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    FrotaComponent,
    NewFrotaComponent,
    MensagensComponent,
    GerirStatusBusComponent,
    EditFrotaComponent,
    FuncionarioComponent,
    ClienteComponent,
    FornecedorComponent,
    ContratoComponent,
    FinanceiroComponent,
    RelatorioComponent,
    NewFuncionarioComponent,
    EditFuncionarioComponent,
    GerirFuncionarioComponent,
    GerirUsuarioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
