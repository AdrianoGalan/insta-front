import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoboComponent } from './robo/robo.component';



const routes: Routes = [
  { path: '', component: RoboComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoboRoutingModule { }
