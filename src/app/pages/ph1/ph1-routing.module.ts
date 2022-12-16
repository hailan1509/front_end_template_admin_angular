import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ph1Component } from './ph1.component';
import { ProfileRefComponent } from './profile-ref/profile-ref.component';

const routes: Routes = [
  {
    path: '',
    component: ph1Component,
    children: [
      { path: 'qlhsdcl', component: ProfileRefComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class PH1RoutingModule { }
