import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancellationMinutesComponent} from './cancellation-minutes/cancellation-minutes.component';
import { CreateHandoverRecordCancelledComponent } from './create-handover-record-canceled/create-handover-record-canceled.component';
import {ph3Component} from './ph3.component';
import { ProfilePendingCanceledComponent } from './profile-pending-canceled/profile-pending-canceled.component';
import { CreateCancellationMinutesComponent } from './create-cancellation-minutes/create-cancellation-minutes.component';
import { HandoverRecordCancelledComponent } from './handover-record-canceled/handover-record-canceled.component';
import { ProfileCanceledComponent } from './profile-canceled/profile-canceled.component';
import { CancellationMinutesWaitingApprovalComponent } from './cancellation-minutes-waiting-approval/cancellation-minutes-waiting-approval.component';


const routes: Routes = [
  {
    path:'',
    component: ph3Component,
    children:[
      {path:'qlhsch', component: ProfilePendingCanceledComponent},
      {path:'lbbbghtl', component: CreateHandoverRecordCancelledComponent},
      {path:'qlbbbghtl', component: HandoverRecordCancelledComponent},
      {path:'lbbthtl', component: CreateCancellationMinutesComponent},
      {path:'qlbbthtl', component: CancellationMinutesComponent},
      {path:'qlhsdh', component: ProfileCanceledComponent},
      {path:'bbthtlcd', component: CancellationMinutesWaitingApprovalComponent},

    ],

  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ph3RoutingModule { }
