import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersRefComponent } from './users-ref/users-ref.component';
import { ph6Component } from './ph6.component';
import { DepartmentRefComponent } from './department-ref/department-ref.component';
import { RoleRefComponent } from './role-ref/role-ref.component';

const routes: Routes = [
  {
    path: '',
    component: ph6Component,
    children: [
      { path: 'qlndnb', component: UsersRefComponent },
      { path: 'qlpb', component: DepartmentRefComponent },
      { path: 'qlvt', component: RoleRefComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PH6RoutingModule { }
