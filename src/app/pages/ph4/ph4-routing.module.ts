import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiningBookComponent } from './mining-book/mining-book.component';
import { ph4Component } from './ph4.component';

const routes: Routes = [{
  path:'',
  component: ph4Component,
  children:[
    {path:'qlsmhs', component: MiningBookComponent},
  ],
  
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PH4RoutingModule { }
