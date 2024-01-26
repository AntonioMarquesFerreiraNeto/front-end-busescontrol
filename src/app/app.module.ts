import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe, IMAGE_CONFIG } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
registerLocaleData(localePT);

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
import { ConsultClienteComponent } from './components/contrato/pages/consult-cliente/consult-cliente.component';
import { ViewClientescontratoComponent } from './components/contrato/pages/view-clientescontrato/view-clientescontrato.component';
import { GerirPdfComponent } from './components/contrato/pages/gerir-pdf/gerir-pdf.component';
import { ModaluserauthComponent } from './components/dropdown-user/modais/modaluserauth/modaluserauth.component';
import { NewFornecedorComponent } from './components/fornecedor/pages/new-fornecedor/new-fornecedor.component';
import { EditFornecedorComponent } from './components/fornecedor/pages/edit-fornecedor/edit-fornecedor.component';
import { GerirFornecedorComponent } from './components/fornecedor/pages/gerir-fornecedor/gerir-fornecedor.component';
import { NewLancamentoComponent } from './components/financeiro/pages/new-lancamento/new-lancamento.component';
import { EditLancamentoComponent } from './components/financeiro/pages/edit-lancamento/edit-lancamento.component';
import { GerirFinanceiroComponent } from './components/financeiro/pages/gerir-financeiro/gerir-financeiro.component';
import { ContabilizacoesComponent } from './components/financeiro/pages/contabilizacoes/contabilizacoes.component';
import { PdfContratosComponent } from './components/relatorio/pages/pdf-contratos/pdf-contratos.component';
import { ConfirmrescisaoComponent } from './components/contrato/pages/confirmrescisao/confirmrescisao.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UserauthService } from './services/userauth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthorizeInterceptor } from './interceptors/authorize.interceptor';
import { AdminGuard } from './guards/admin.guard';
import { EsqueceusenhaComponent } from './components/login/pages/esqueceusenha/esqueceusenha.component';
import { RedefinirsenhaComponent } from './components/login/pages/redefinirsenha/redefinirsenha.component';
import { SubstituicoesComponent } from './components/contrato/pages/substituicoes/substituicoes.component';
import { GerirdisponibilidadeComponent } from './components/frota/pages/gerirdisponibilidade/gerirdisponibilidade.component';
import { ModalGerircoresComponent } from './components/frota/pages/modal-gerircores/modal-gerircores.component';
import { DropdownUserComponent } from './components/dropdown-user/dropdown-user.component';
import { NotificacoesComponent } from './components/dropdown-user/modais/notificacoes/notificacoes.component';
import { ModalmensagensComponent } from './components/dropdown-user/modais/modalmensagens/modalmensagens.component';
import { EnviarMensagemComponent } from './components/dropdown-user/modais/enviar-mensagem/enviar-mensagem.component';
import { EnviadasComponent } from './components/dropdown-user/modais/enviadas/enviadas.component';
import { ConfirmexclusaoComponent } from './components/dropdown-user/modais/enviadas/confirmexclusao/confirmexclusao.component';
import { ViewlembreteComponent } from './components/dropdown-user/modais/modalmensagens/viewmensagem/viewlembrete.component';

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
    AprovacaoContratoComponent,
    ConsultClienteComponent,
    ViewClientescontratoComponent,
    GerirPdfComponent,
    ModaluserauthComponent,
    NewFornecedorComponent,
    EditFornecedorComponent,
    GerirFornecedorComponent,
    NewLancamentoComponent,
    EditLancamentoComponent,
    GerirFinanceiroComponent,
    ContabilizacoesComponent,
    PdfContratosComponent,
    ConfirmrescisaoComponent,
    LoginComponent,
    EsqueceusenhaComponent,
    RedefinirsenhaComponent,
    SubstituicoesComponent,
    GerirdisponibilidadeComponent,
    ModalGerircoresComponent,
    DropdownUserComponent,
    NotificacoesComponent,
    ModalmensagensComponent,
    EnviarMensagemComponent,
    EnviadasComponent,
    ConfirmexclusaoComponent,
    ViewlembreteComponent
  ],
  imports: [
    NgSelectModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(
      { dropSpecialCharacters: true }
    )
  ],
  providers: [
    DatePipe, UserauthService, AuthGuard, AdminGuard,
    { provide: LOCALE_ID, useValue: 'pt-br'},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
