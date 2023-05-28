import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrotaComponent } from './components/frota/frota.component';
import { NewFrotaComponent } from './components/frota/pages/new-frota/new-frota.component';
import { EditFrotaComponent } from './components/frota/pages/edit-frota/edit-frota.component';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { NewFuncionarioComponent } from './components/funcionario/pages/new-funcionario/new-funcionario.component';
import { EditFuncionarioComponent } from './components/funcionario/pages/edit-funcionario/edit-funcionario.component';

const routes: Routes = [
  { path: 'frota', component: FrotaComponent },
  { path: 'frota/newfrota', component: NewFrotaComponent },
  { path: 'frota/edit/:id', component: EditFrotaComponent },
  { path: 'funcionario', component: FuncionarioComponent },
  { path: 'funcionario/newfuncionario', component: NewFuncionarioComponent },
  { path: 'funcionario/editfuncionario/:id', component: EditFuncionarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
