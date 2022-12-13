import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/@shared/shared.module';
import {
  DatepickerModule,
  InputNumberModule,
  PaginationModule,
  TooltipModule,
} from 'ng-devui';
import { AdminFormModule } from 'src/app/@shared/components/admin-form/admin-form.module';
// import { CancellationMinutesRefComponent } from './cancellation-minutes-ref/cancellation-minutes-ref.component';
import { CancellationProfileListComponent } from './cancellation-profile-list/cancellation-profile-list.component';
import { ph3Component } from './ph3.component';
import { CancellationMinutesComponent } from './cancellation-minutes/cancellation-minutes.component';
import { ph3RoutingModule } from './ph3-routing.module';

@NgModule({
  declarations: [
    ph3Component,
    CancellationMinutesComponent,
    CancellationProfileListComponent,
    // CancellationMinutesComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    PaginationModule,
    AdminFormModule,
    InputNumberModule,
    DatepickerModule,
    TooltipModule,
    ph3RoutingModule,
  ],
})
export class ph3Module {
  
 }
