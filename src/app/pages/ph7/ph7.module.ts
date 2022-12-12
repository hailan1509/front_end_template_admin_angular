import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PH7RoutingModule } from './ph7-routing.module';
import { LinhvucComponent } from './linhvuc/linhvuc.component';


@NgModule({
  declarations: [
    LinhvucComponent
  ],
  imports: [
    CommonModule,
    PH7RoutingModule
  ]
})
export class PH7Module { }
