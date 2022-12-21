import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancellationMinutesComponent} from './cancellation-minutes/cancellation-minutes.component';
import { CreateHandoverRecordCancelledComponent } from './create-handover-record-canceled/create-handover-record-canceled.component';
import {ph3Component} from './ph3.component';
import { ProfileRecordsComponent } from './profile-records/profile-records.component';
const routes: Routes = [
  {
    path:'',
    component: ph3Component,
    children:[
      {path:'qlhsch', component: ProfileRecordsComponent},
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
