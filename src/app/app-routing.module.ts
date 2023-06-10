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

const routes: Routes = [
  //Defino path do component Home como '' para iniciar o sistema na página home.
  { path: '', component: HomeComponent },

  //Outras rotas.
  { path: 'frota', component: FrotaComponent },
  { path: 'frota/newfrota', component: NewFrotaComponent },
  { path: 'frota/edit/:id', component: EditFrotaComponent },
  { path: 'funcionario', component: FuncionarioComponent },
  { path: 'funcionario/newfuncionario', component: NewFuncionarioComponent },
  { path: 'funcionario/editfuncionario/:id', component: EditFuncionarioComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'cliente/newcliente', component: NewClienteComponent },
  { path: 'cliente/editcliente/:id', component: EditClienteComponent },
  { path: 'cliente-juridico', component: ClienteJuridicoComponent },
  { path: 'cliente-juridico/newcliente', component: NewClientepjComponent },
  { path: 'cliente-juridico/editcliente/:id', component: EditClientepjComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contrato', component: ContratoComponent },
  { path: 'contrato/newcontrato', component: NewContratoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
