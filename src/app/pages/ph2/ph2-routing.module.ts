import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHandoverMinutesComponent } from './create-handover-minutes/create-handover-minutes.component';
import { HandedOverProfileComponent } from './handed-over-profile/handed-over-profile.component';
import { HandoverMinutesComponent } from './handover-minutes/handover-minutes.component';
import {ph2Component} from './ph2.component';
const routes: Routes = [
  {
    path:'',
    component: ph2Component,
    children:[
       {path:'qlbbbg', component: HandoverMinutesComponent},
       {path:'lbbbg', component: CreateHandoverMinutesComponent},
       {path:'qlhsdbg', component: HandedOverProfileComponent},
    ],
    
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PH2RoutingModule { }
