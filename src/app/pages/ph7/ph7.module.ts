import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PH7RoutingModule } from './ph7-routing.module';
import { PH7Component } from './ph7.component';
import { FieldsListComponent } from './fields/fields-list.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import {
  DatepickerModule,
  InputNumberModule,
  PaginationModule,
  TooltipModule,
} from 'ng-devui';
import { AdminFormModule } from 'src/app/@shared/components/admin-form/admin-form.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PH7Component,
    FieldsListComponent,
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
