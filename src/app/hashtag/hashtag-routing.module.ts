import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerarComponent } from './gerar/gerar.component';

import { ListarComponent } from './listar/listar.component';
import { SalvarComponent } from './salvar/salvar.component';


const routes: Routes = [
  { path: '', component: GerarComponent},
  { path: 'listar', component: ListarComponent},
  { path: 'addhashtag', component: SalvarComponent},
  { path: 'gerarhashtag', component: GerarComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HashtagRoutingModule { }
