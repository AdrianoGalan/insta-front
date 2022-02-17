import { GerarPerfilComponent } from './gerar-perfil/gerar-perfil.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtualizarComponent } from './atualizar/atualizar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [
  { path: '', component: ListarComponent},
  { path: 'cadastrar', component: CadastrarComponent},
  { path: 'gerar', component: GerarPerfilComponent},
  { path: 'atualizar/:username', component: AtualizarComponent},
  { path: 'detalhe/:username', component: DetalheComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
