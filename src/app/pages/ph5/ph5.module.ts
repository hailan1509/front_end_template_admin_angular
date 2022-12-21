import { NgModule } from '@angular/core';
import {
  DatepickerModule,
  InputNumberModule,
  PaginationModule,
  TooltipModule,
} from 'ng-devui';
import { EchartsModule } from 'src/app/@shared/components/echarts/echarts.module';

import { PH5RoutingModule } from './ph5-routing.module';
import { PH5Component } from './ph5-component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { ReportCancellationProfileComponent } from './report-cancellation-profile/report-cancellation-profile.component';
import { ReportArchivalProfileComponent } from './report-archival-profile/report-archival-profile.component';
import { ReportMiningFileComponent } from './report-mining-file/report-mining-file.component';
import { ReportProfileDocumentBorrowedComponent } from './report-profile-document-borrowed/report-profile-document-borrowed.component';
import { StatisticDocumentComponent } from './statistic-document/statistic-document.component';
import { StatisticInputReportArchiveComponent } from './statistic_input_report_archive/statistic_input_report_archive.component';
import { StatisticQuantityProfileForYearComponent } from './statistic-quantity-profile-for-year/statistic-quantity-profile-for-year.component';
import { DataAlterComponent } from './report-data-alter/report-data-alter.component';

@NgModule({
  declarations: [
    PH5Component,
    ReportArchivalProfileComponent,
    ReportCancellationProfileComponent,
    ReportMiningFileComponent,
    ReportProfileDocumentBorrowedComponent,
    StatisticDocumentComponent,
    StatisticInputReportArchiveComponent,
    StatisticQuantityProfileForYearComponent,
    DataAlterComponent
  ],
  imports: [
    PaginationModule,
    TooltipModule,
    SharedModule,
    DatepickerModule,
    InputNumberModule,
    EchartsModule,
    PH5RoutingModule
  ]
})
export class PH5Module { }
