import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/@shared/shared.module';

import { PH6RoutingModule } from './ph6-routing.module';
import { UsersRefComponent } from './users-ref/users-ref.component';
import {
  DatepickerModule,
  InputNumberModule,
  PaginationModule,
  TooltipModule,
} from 'ng-devui';
import { FormsModule } from '@angular/forms';
import { AdminFormModule } from 'src/app/@shared/components/admin-form';
import { ph6Component } from './ph6.component';
import { DepartmentRefComponent } from './department-ref/department-ref.component';
import { RoleRefComponent } from './role-ref/role-ref.component';

@NgModule({
  declarations: [
    UsersRefComponent,
    ph6Component,
    DepartmentRefComponent,
    RoleRefComponent,
  ],
  imports: [
    CommonModule,
    PH6RoutingModule,

    SharedModule,
    FormsModule,
    PaginationModule,
    AdminFormModule,
    InputNumberModule,
    DatepickerModule,
    TooltipModule,

  ]
})
export class PH6Module { }
