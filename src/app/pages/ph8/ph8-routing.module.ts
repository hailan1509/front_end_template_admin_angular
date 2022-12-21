import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddValueComponent } from './number-list/add-value/add-value.component';
import { NumberListComponent } from './number-list/number-list.component';
import { PH8Component } from './ph8.component';

const routes: Routes = [
  {
    path: '',
    component: PH8Component,
    children: [
      { path: 'tltdl', component: NumberListComponent },
      { path: 'new', component: AddValueComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PH8RoutingModule { }
