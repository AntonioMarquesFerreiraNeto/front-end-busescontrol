import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrotaComponent } from './components/frota/frota.component';
import { NewFrotaComponent } from './components/frota/pages/new-frota/new-frota.component';
import { EditFrotaComponent } from './components/frota/pages/edit-frota/edit-frota.component';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { NewFuncionarioComponent } from './components/funcionario/pages/new-funcionario/new-funcionario.component';
import { EditFuncionarioComponent } from './components/funcionario/pages/edit-funcionario/edit-funcionario.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { NewClienteComponent } from './components/cliente/pages/new-cliente/new-cliente.component';
import { EditClienteComponent } from './components/cliente/pages/edit-cliente/edit-cliente.component';
import { NewClientepjComponent } from './components/cliente/cliente-juridico/pages/new-clientepj/new-clientepj.component';
import { ClienteJuridicoComponent } from './components/cliente/cliente-juridico/cliente-juridico.component';
import { EditClientepjComponent } from './components/cliente/cliente-juridico/pages/edit-clientepj/edit-clientepj.component';
import { HomeComponent } from './components/home/home.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { NewContratoComponent } from './components/contrato/pages/new-contrato/new-contrato.component';
import { FornecedorComponent } from './components/fornecedor/fornecedor.component';
import { EditContratoComponent } from './components/contrato/pages/edit-contrato/edit-contrato.component';
import { FinanceiroComponent } from './components/financeiro/financeiro.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { ContabilizacoesComponent } from './components/financeiro/pages/contabilizacoes/contabilizacoes.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { EsqueceusenhaComponent } from './components/login/pages/esqueceusenha/esqueceusenha.component';
import { RedefinirsenhaComponent } from './components/login/pages/redefinirsenha/redefinirsenha.component';
import { NoAuthGuard } from './guards/no-auth-guard';

const routes: Routes = [
  //Defino path do component Home como '' para iniciar o sistema na página home.
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  //Outras rotas.
  { path: 'frota', component: FrotaComponent, canActivate: [AuthGuard] },
  { path: 'frota/newfrota', component: NewFrotaComponent, canActivate: [AuthGuard] },
  { path: 'frota/edit/:id', component: EditFrotaComponent, canActivate: [AuthGuard] },

  { path: 'funcionario', component: FuncionarioComponent, canActivate: [AdminGuard] },
  { path: 'funcionario/newfuncionario', component: NewFuncionarioComponent, canActivate: [AdminGuard] },
  { path: 'funcionario/editfuncionario/:id', component: EditFuncionarioComponent, canActivate: [AdminGuard] },

  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'cliente/newcliente', component: NewClienteComponent, canActivate: [AuthGuard] },
  { path: 'cliente/editcliente/:id', component: EditClienteComponent, canActivate: [AuthGuard] },
  { path: 'cliente-juridico', component: ClienteJuridicoComponent, canActivate: [AuthGuard] },
  { path: 'cliente-juridico/newcliente', component: NewClientepjComponent, canActivate: [AuthGuard] },
  { path: 'cliente-juridico/editcliente/:id', component: EditClientepjComponent, canActivate: [AuthGuard] },

  { path: 'fornecedor', component: FornecedorComponent, canActivate: [AuthGuard] },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  { path: 'contrato', component: ContratoComponent, canActivate: [AuthGuard] },
  { path: 'contrato/newcontrato', component: NewContratoComponent, canActivate: [AuthGuard] },
  { path: 'contrato/edit/:id', component: EditContratoComponent, canActivate: [AuthGuard] },

  { path: 'financeiro', component: FinanceiroComponent, canActivate: [AdminGuard] },
  { path: 'financeiro/:pageNumber/:filtro/:pageSize', component: FinanceiroComponent, canActivate: [AdminGuard] },
  { path: 'financeiro/:pageNumber/:filtro/:pageSize/:pesquisa', component: FinanceiroComponent, canActivate: [AdminGuard] },
  { path: 'financeiro/parcelas/:id/:refPageFinanceiro/:refFiltro/:refPageSize', component: ContabilizacoesComponent, canActivate: [AdminGuard] },
  { path: 'financeiro/parcelas/:id/:refPageFinanceiro/:refFiltro/:refPageSize/:refPesquisa', component: ContabilizacoesComponent, canActivate: [AdminGuard] },

  { path: 'dashboard', component: RelatorioComponent, canActivate: [AdminGuard] },

  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'esqueceuSenha', component: EsqueceusenhaComponent, canActivate: [NoAuthGuard] },
  { path: 'redefinirSenha/:chave', component: RedefinirsenhaComponent, canActivate: [NoAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
