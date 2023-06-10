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
import { NewClienteComponent } from './components/cliente/pages/new-cliente/new-cliente.component';
import { EditClienteComponent } from './components/cliente/pages/edit-cliente/edit-cliente.component';
import { GerirClienteComponent } from './components/cliente/pages/gerir-cliente/gerir-cliente.component';
import { ClienteJuridicoComponent } from './components/cliente/cliente-juridico/cliente-juridico.component';
import { NewClientepjComponent } from './components/cliente/cliente-juridico/pages/new-clientepj/new-clientepj.component';
import { EditClientepjComponent } from './components/cliente/cliente-juridico/pages/edit-clientepj/edit-clientepj.component';
import { GerirClientepjComponent } from './components/cliente/cliente-juridico/pages/gerir-clientepj/gerir-clientepj.component';
import { HomeComponent } from './components/home/home.component';
import { NewContratoComponent } from './components/contrato/pages/new-contrato/new-contrato.component';
import { EditContratoComponent } from './components/contrato/pages/edit-contrato/edit-contrato.component';
import { GerirContratoComponent } from './components/contrato/pages/gerir-contrato/gerir-contrato.component';
import { AprovacaoContratoComponent } from './components/contrato/pages/aprovacao-contrato/aprovacao-contrato.component';

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
    GerirUsuarioComponent,
    NewClienteComponent,
    EditClienteComponent,
    GerirClienteComponent,
    ClienteJuridicoComponent,
    NewClientepjComponent,
    EditClientepjComponent,
    GerirClientepjComponent,
    HomeComponent,
    NewContratoComponent,
    EditContratoComponent,
    GerirContratoComponent,
    AprovacaoContratoComponent
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
