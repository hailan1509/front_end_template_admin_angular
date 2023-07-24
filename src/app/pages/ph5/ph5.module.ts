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
import { FormsModule } from '@angular/forms';
import { AdminFormModule } from 'src/app/@shared/components/admin-form/admin-form.module';
import { ReportCancellationProfileComponent } from './report-cancellation-profile/report-cancellation-profile.component';
import { ReportArchivalProfileComponent } from './report-archival-profile/report-archival-profile.component';
import { ReportMiningFileComponent } from './report-mining-file/report-mining-file.component';
import { ReportProfileDocumentBorrowedComponent } from './report-profile-document-borrowed/report-profile-document-borrowed.component';
import { StatisticDocumentComponent } from './statistic-document/statistic-document.component';
import { LogActiveComponent } from './log-active/log-active.component';
import {ParseSelectPipe} from 'src/app/pages/parseFromPipe.pipe';


@NgModule({
  declarations: [
    PH5Component,
    // ParseSelectPipe,
    ReportArchivalProfileComponent,
    ReportCancellationProfileComponent,
    ReportMiningFileComponent,
    ReportProfileDocumentBorrowedComponent,
    StatisticDocumentComponent,
    LogActiveComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    AdminFormModule,
    PaginationModule,
    DatepickerModule,
    InputNumberModule,
    TooltipModule,
    PH5RoutingModule
  ]
})
export class PH5Module { }
