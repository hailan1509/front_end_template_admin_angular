import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ph1Component } from './ph1.component';
import { ProfileRefComponent } from './profile-ref/profile-ref.component';
import { DocumentByProfileComponent } from './document-by-profile/document-by-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ph1Component,
    children: [
      { path: 'qlhsdcl', component: ProfileRefComponent },
      { path: 'qlhs/:archive_fonts_rcd', component: ProfileRefComponent },
      { path: 'documents/:id', component: DocumentByProfileComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class PH1RoutingModule { }
