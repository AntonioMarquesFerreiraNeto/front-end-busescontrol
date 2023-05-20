import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FrotaComponent } from './components/frota/frota.component';
import { NewFrotaComponent } from './components/frota/pages/new-frota/new-frota.component';
import { MensagensComponent } from './components/mensagens/mensagens.component';
import { GerirStatusBusComponent } from './components/frota/pages/gerir-status/gerirstatus-bus.component';
import { EditFrotaComponent } from './components/frota/pages/edit-frota/edit-frota.component'

@NgModule({
  declarations: [
    AppComponent,
    FrotaComponent,
    NewFrotaComponent,
    MensagensComponent,
    GerirStatusBusComponent,
    EditFrotaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
