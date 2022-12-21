import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancellationMinutesComponent} from './cancellation-minutes/cancellation-minutes.component';
import { CreateHandoverRecordCancelledComponent } from './create-handover-record-canceled/create-handover-record-canceled.component';
import {ph3Component} from './ph3.component';
import { ProfilePendingCanceledComponent } from './profile-pending-canceled/profile-pending-canceled.component';

const routes: Routes = [
  {
    path:'',
    component: ph3Component,
    children:[
      {path:'qlhsch', component: ProfilePendingCanceledComponent},
      {path:'qlbbbghtl', component: CancellationMinutesComponent},
      {path:'lbbbghtl', component: CreateHandoverRecordCancelledComponent},

    ],

  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ph3RoutingModule { }
