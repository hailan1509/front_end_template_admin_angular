import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ph1Component } from './ph1.component';
import { ProfilePendingComponent } from './profile-pending/profile-pending.component';
import { ProfileEditedComponent } from './profile-edited/profile-edited.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ph1Component,
    children: [
      { path: 'qlhsccl', component: ProfilePendingComponent },
      {path: 'bshs', redirectTo: 'bshs/', pathMatch: 'full'},
      {path: 'bshs/:id', component: CreateProfileComponent},
      { path: 'qlhsdcl', component: ProfileEditedComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class PH1RoutingModule { }
