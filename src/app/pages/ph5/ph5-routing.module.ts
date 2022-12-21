import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PH5Component } from './ph5-component';
import { ReportMiningFileComponent } from './report-mining-file/report-mining-file.component';
import { ReportCancellationProfileComponent } from './report-cancellation-profile/report-cancellation-profile.component';
import { ReportArchivalProfileComponent } from './report-archival-profile/report-archival-profile.component';
import { StatisticDocumentComponent } from './statistic-document/statistic-document.component';
import { ReportProfileDocumentBorrowedComponent } from './report-profile-document-borrowed/report-profile-document-borrowed.component';
import { StatisticInputReportArchiveComponent } from './statistic_input_report_archive/statistic_input_report_archive.component';
import { StatisticQuantityProfileForYearComponent } from './statistic-quantity-profile-for-year/statistic-quantity-profile-for-year.component';
import { DataAlterComponent } from './report-data-alter/report-data-alter.component';



const routes: Routes = [
  {
    path: '',
    component: PH5Component,
    children: [
      { path: 'bchslt', component: ReportArchivalProfileComponent },
      { path: 'bchsh', component: ReportCancellationProfileComponent },
      { path: 'bcpkt', component: ReportMiningFileComponent },
      { path: 'bchstldm', component: ReportProfileDocumentBorrowedComponent },
      { path: 'tksltltn', component: StatisticDocumentComponent },
      { path: 'tkhsdvlt', component: StatisticInputReportArchiveComponent },
      { path: 'tkslhstn', component: StatisticQuantityProfileForYearComponent },
      { path: 'bcdlskdn', component: DataAlterComponent },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PH5RoutingModule {}
