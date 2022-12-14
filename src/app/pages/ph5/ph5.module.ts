import { NgModule } from '@angular/core';
import {
  DatepickerModule,
  InputNumberModule,
  PaginationModule,
  TooltipModule,
} from 'ng-devui';


import { PH5RoutingModule } from './ph5-routing.module';
import { PH5Component } from './ph5-component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { ReportCancellationProfileComponent } from './report-cancellation-profile/report-cancellation-profile.component';
import { ReportArchivalProfileComponent } from './report-archival-profile/report-archival-profile.component';
import { ReportMiningFileComponent } from './report-mining-file/report-mining-file.component';
import { ReportProfileDocumentBorrowedComponent } from './report-profile-document-borrowed/report-profile-document-borrowed.component';
import { StatisticDocumentComponent } from './statistic-document/statistic-document.component';


@NgModule({
  declarations: [
    PH5Component,
    ReportArchivalProfileComponent,
    ReportCancellationProfileComponent,
    ReportMiningFileComponent,
    ReportProfileDocumentBorrowedComponent,
    StatisticDocumentComponent,
  ],
  imports: [
    PaginationModule,
    TooltipModule,
    SharedModule,
    DatepickerModule,
    InputNumberModule,
    PH5RoutingModule
  ]
})
export class PH5Module { }
