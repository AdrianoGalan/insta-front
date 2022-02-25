import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoboRoutingModule } from './robo-routing.module';
import { RoboComponent } from './robo/robo.component';


@NgModule({
  declarations: [
    RoboComponent
  ],
  imports: [
    CommonModule,
    RoboRoutingModule
  ]
})
export class RoboModule { }
