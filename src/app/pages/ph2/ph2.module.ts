import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/@shared/shared.module';
import { PH2RoutingModule } from './ph2-routing.module';
import {
  DatepickerModule,
  InputNumberModule,
  PaginationModule,
  TooltipModule,
} from 'ng-devui';
import { AdminFormModule } from 'src/app/@shared/components/admin-form/admin-form.module';
import { ph2Component } from './ph2.component';
import { HandoverMinutesComponent } from './handover-minutes/handover-minutes.component';
import { CreateHandoverMinutesComponent } from './create-handover-minutes/create-handover-minutes.component';


@NgModule({
  declarations: [
    ph2Component,
    HandoverMinutesComponent,
    CreateHandoverMinutesComponent,
    
  ],
  imports: [
    SharedModule,
    FormsModule,
    PaginationModule,
    AdminFormModule,
    InputNumberModule,
    DatepickerModule,
    TooltipModule,
    PH2RoutingModule,
  ],
})
export class PH2Module { }
