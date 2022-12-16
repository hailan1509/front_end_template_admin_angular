import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FieldsListComponent } from './fields/fields-list.component';
import { PH7Component } from './ph7.component';

const routes: Routes = [
  {
    path: '',
    component: PH7Component,
    children: [
      { path: 'qllv', component: FieldsListComponent },


    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PH7RoutingModule { }
