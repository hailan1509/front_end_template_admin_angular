import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PH1RoutingModule } from './ph1-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/@shared/shared.module';
import {
  DatepickerModule,
  InputNumberModule,
  PaginationModule,
  TooltipModule,
} from 'ng-devui';
import { AdminFormModule } from 'src/app/@shared/components/admin-form/admin-form.module';
import { ph1Component } from './ph1.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ph1Component,
    
  ],
  imports: [
    SharedModule,
    FormsModule,
    PaginationModule,
    AdminFormModule,
    InputNumberModule,
    DatepickerModule,
    TooltipModule,
    CommonModule,
    PH1RoutingModule
  ]
})
export class PH1Module { }
