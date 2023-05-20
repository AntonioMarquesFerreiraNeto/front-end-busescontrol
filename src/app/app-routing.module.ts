import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrotaComponent } from './components/frota/frota.component';
import { NewFrotaComponent } from './components/frota/pages/new-frota/new-frota.component';
import { EditFrotaComponent } from './components/frota/pages/edit-frota/edit-frota.component';

const routes: Routes = [
  {path: 'frota', component: FrotaComponent},
  {path: 'frota/newfrota', component: NewFrotaComponent},
  {path: 'frota/edit/:id', component: EditFrotaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
