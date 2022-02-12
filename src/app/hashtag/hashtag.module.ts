import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GerarComponent } from './gerar/gerar.component';
import { HashtagRoutingModule } from './hashtag-routing.module';
import { ListarComponent } from './listar/listar.component';
import { SalvarComponent } from './salvar/salvar.component';


@NgModule({
  declarations: [
    ListarComponent,
    SalvarComponent,
    GerarComponent
  ],
  imports: [
    CommonModule,
    HashtagRoutingModule
  ]
})
export class HashtagModule { }
