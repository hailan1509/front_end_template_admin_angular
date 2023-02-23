import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/@shared/shared.module';
import {
  DatepickerModule,
  InputNumberModule,
  PaginationModule,
  TooltipModule,
} from 'ng-devui';
import { AdminFormModule } from 'src/app/@shared/components/admin-form/admin-form.module';
// import { CancellationMinutesRefComponent } from './cancellation-minutes-ref/cancellation-minutes-ref.component';
import { ph3Component } from './ph3.component';
import { CancellationMinutesComponent } from './cancellation-minutes/cancellation-minutes.component';
import { ph3RoutingModule } from './ph3-routing.module';
import { ProfilePendingCanceledComponent } from './profile-pending-canceled/profile-pending-canceled.component';
import { CreateHandoverRecordCancelledComponent } from './create-handover-record-canceled/create-handover-record-canceled.component';
import { CreateCancellationMinutesComponent } from './create-cancellation-minutes/create-cancellation-minutes.component';
import { HandoverRecordCancelledComponent } from './handover-record-canceled/handover-record-canceled.component';
import { ProfileCanceledComponent } from './profile-canceled/profile-canceled.component';
import { CancellationMinutesWaitingApprovalComponent } from './cancellation-minutes-waiting-approval/cancellation-minutes-waiting-approval.component';
// import {ParseSelectPipe} from 'src/app/pages/parseFromPipe.pipe';

@NgModule({
  declarations: [
    ph3Component,
    CancellationMinutesComponent,
    ProfilePendingCanceledComponent,
    CreateHandoverRecordCancelledComponent,
    HandoverRecordCancelledComponent,
    CreateCancellationMinutesComponent,
    ProfileCanceledComponent,
    CancellationMinutesWaitingApprovalComponent,
    // ParseSelectPipe
  ],
  imports: [
    SharedModule,
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
