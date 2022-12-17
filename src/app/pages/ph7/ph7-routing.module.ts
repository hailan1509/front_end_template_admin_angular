import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FieldsRefComponent } from './fields-ref/fields-ref.component';
import { ph7Component } from './ph7.component';


const routes: Routes = [
  {
    path: '',
    component: ph7Component,
    children: [
      { path: 'qllv', component: FieldsRefComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PH7RoutingModule { }