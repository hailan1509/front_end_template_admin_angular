import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HandoverMinutesComponent } from './handover-minutes/handover-minutes.component';
// import { CancellationProfileListComponent } from './cancellation-profile-list/cancellation-profile-list.component';
import {ph2Component} from './ph2.component';
const routes: Routes = [
  {
    path:'',
    component: ph2Component,
    children:[
       {path:'qlbbbg', component: HandoverMinutesComponent},
    ],
    
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PH2RoutingModule { }
