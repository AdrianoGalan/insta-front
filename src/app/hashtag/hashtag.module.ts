import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { GerarComponent } from './gerar/gerar.component';
import { HashtagRoutingModule } from './hashtag-routing.module';
import { ListarComponent } from './listar/listar.component';
import { NovaCategoriaComponent } from './nova-categoria/nova-categoria.component';
import { SalvarComponent } from './salvar/salvar.component';


@NgModule({
  declarations: [
    ListarComponent,
    SalvarComponent,
    GerarComponent,
    NovaCategoriaComponent
  ],
  imports: [
    CommonModule,
    HashtagRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule
  ]
})
export class HashtagModule { }
