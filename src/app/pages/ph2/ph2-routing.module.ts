import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CancellationMinutesComponent} from './cancellation-minutes/cancellation-minutes.component';
// import { CancellationProfileListComponent } from './cancellation-profile-list/cancellation-profile-list.component';
import {ph2Component} from './ph2.component';
const routes: Routes = [
  {
    path:'',
    component: ph2Component,
    children:[
      // {path:'qlbbbg', component: CancellationMinutesComponent},
    ],
    
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PH2RoutingModule { }
