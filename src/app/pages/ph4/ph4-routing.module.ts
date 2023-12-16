import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiningBookComponent } from './mining-book/mining-book.component';
import { ProposeProfileComponent } from './propose-profile/propose-profile.component';
import { ph4Component } from './ph4.component';

const routes: Routes = [{
  path:'',
  component: ph4Component,
  children:[
    {path:'qlsmhs', component: MiningBookComponent},
    {path:'dxhs', component: ProposeProfileComponent},
  ],
  
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PH4RoutingModule { }
