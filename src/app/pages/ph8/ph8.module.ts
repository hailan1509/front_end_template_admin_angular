import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PH8Component } from './ph8.component';
import { NumberListComponent } from './number-list/number-list.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { PH8RoutingModule } from './ph8-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {
  DatepickerModule,
  InputNumberModule,
  PaginationModule,
  TooltipModule,
} from 'ng-devui';


@NgModule({
  declarations: [
    PH8Component,
    NumberListComponent,
  ],
  imports: [
    SharedModule,
    PH8RoutingModule,
    FormsModule,
    PaginationModule,
    InputNumberModule,
    DatepickerModule,
    TooltipModule,
    PdfViewerModule,
  ],
})
export class PH8Module {}
