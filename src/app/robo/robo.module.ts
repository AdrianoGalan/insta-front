import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { RoboRoutingModule } from './robo-routing.module';
import { RoboComponent } from './robo/robo.component';


@NgModule({
  declarations: [
    RoboComponent
  ],
  imports: [
    CommonModule,
    RoboRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule
  ]
})
export class RoboModule { }
