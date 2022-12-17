import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/@shared/shared.module';

import { PH7RoutingModule } from './ph7-routing.module';
import { FieldsRefComponent } from './fields-ref/fields-ref.component';
import {
  DatepickerModule,
  InputNumberModule,
  PaginationModule,
  TooltipModule,
} from 'ng-devui';
import { FormsModule } from '@angular/forms';
import { AdminFormModule } from 'src/app/@shared/components/admin-form';
import { ph7Component } from './ph7.component';


@NgModule({
  declarations: [
    FieldsRefComponent,
    ph7Component,

  ],
  imports: [
    CommonModule,
    PH7RoutingModule,

    SharedModule,
    FormsModule,
    PaginationModule,
    AdminFormModule,
    InputNumberModule,
    DatepickerModule,
    TooltipModule,

  ]
})
export class PH7Module { }