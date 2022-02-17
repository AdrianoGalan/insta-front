import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ListarComponent } from './listar/listar.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { NovoEmailComponent } from './novo-email/novo-email.component';
import { NovoStatusComponent } from './novo-status/novo-status.component';
import { AtualizarComponent } from './atualizar/atualizar.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { GerarPerfilComponent } from './gerar-perfil/gerar-perfil.component';


@NgModule({
  declarations: [
    CadastrarComponent,
    ListarComponent,
    NovoEmailComponent,
    NovoStatusComponent,
    AtualizarComponent,
    DetalheComponent,
    GerarPerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule

  ]
})
export class PerfilModule { }
