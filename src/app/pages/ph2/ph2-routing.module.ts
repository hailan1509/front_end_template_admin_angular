import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHandoverMinutesComponent } from './create-handover-minutes/create-handover-minutes.component';
import { HandoverMinutesComponent } from './handover-minutes/handover-minutes.component';
import {ph2Component} from './ph2.component';
const routes: Routes = [
  {
    path:'',
    component: ph2Component,
    children:[
       {path:'qlbbbg', component: HandoverMinutesComponent},
       {path:'lbbbg', component: CreateHandoverMinutesComponent},
    ],
    
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PH2RoutingModule { }
