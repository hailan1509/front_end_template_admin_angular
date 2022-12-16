import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileRefComponent } from './profile-ref/profile-ref.component';
import { ph1Component } from './ph1.component';
const routes: Routes = [
  {
    path:'',
    component: ph1Component,
    children:[
       {path:'', component: ProfileRefComponent},
    ],
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PH1RoutingModule { }
