import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancellationMinutesComponent} from './cancellation-minutes/cancellation-minutes.component';
import { CancellationProfileListComponent } from './cancellation-profile-list/cancellation-profile-list.component';
import {ph3Component} from './ph3.component';
const routes: Routes = [
  {
    path:'',
    component: ph3Component,
    children:[
      {path:'qlbbbghtl', component: CancellationMinutesComponent},
    ],
    
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ph3RoutingModule { }
