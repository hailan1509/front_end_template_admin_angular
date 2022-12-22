import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PH1RoutingModule } from './ph1-routing.module';
import { ProfileRefComponent } from './profile-ref/profile-ref.component';
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
import { DocumentByProfileComponent } from './document-by-profile/document-by-profile.component';


@NgModule({
  declarations: [
    ProfileRefComponent,
    ph1Component,
    DocumentByProfileComponent,


  ],
  imports: [
     SharedModule,
    FormsModule,
    PaginationModule,
    AdminFormModule,
    InputNumberModule,
    DatepickerModule,
    TooltipModule,
    PH1RoutingModule
  ]
})
export class PH1Module { }
