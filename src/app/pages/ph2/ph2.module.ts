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
// import { CancellationMinutesRefComponent } from './cancellation-minutes-ref/cancellation-minutes-ref.component';
// import { CancellationProfileListComponent } from './cancellation-profile-list/cancellation-profile-list.component';
import { ph2Component } from './ph2.component';
// import { CancellationMinutesComponent } from './cancellation-minutes/cancellation-minutes.component';


@NgModule({
  declarations: [
    ph2Component,
    // CancellationMinutesComponent,
    // CancellationProfileListComponent,
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
    PH2RoutingModule,
  ],
})
export class PH2Module { }
