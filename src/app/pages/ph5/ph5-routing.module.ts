import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PH5Component } from './ph5-component';
import { ReportMiningFileComponent } from './report-mining-file/report-mining-file.component';
import { ReportCancellationProfileComponent } from './report-cancellation-profile/report-cancellation-profile.component';
import { ReportArchivalProfileComponent } from './report-archival-profile/report-archival-profile.component';

const routes: Routes = [
  {
    path: '',
    component: PH5Component,
    children: [
      { path: 'bchslt', component: ReportArchivalProfileComponent },
      { path: 'bchsh', component: ReportCancellationProfileComponent },
      { path: 'bcpkt', component: ReportMiningFileComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PH5RoutingModule {}
