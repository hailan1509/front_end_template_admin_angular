import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NumberListComponent } from './number-list/number-list.component';
import { PH8Component } from './ph8.component';

const routes: Routes = [
  {
    path: '',
    component: PH8Component,
    children: [
      { path: 'tltdl', component: NumberListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PH8RoutingModule { }
