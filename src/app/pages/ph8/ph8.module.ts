import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PH8Component } from './ph8.component';
import { NumberListComponent } from './number-list/number-list.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { PH8RoutingModule } from './ph8-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AdminFormModule } from 'src/app/@shared/components/admin-form/admin-form.module';
import {
  DatepickerModule,
  InputNumberModule,
  PaginationModule,
  TooltipModule,
} from 'ng-devui';
import { AddValueComponent } from './number-list/add-value/add-value.component';
import { InputDocumentComponent } from './input-document/input-document.component';


@NgModule({
  declarations: [
    PH8Component,
    NumberListComponent,
    AddValueComponent,
    InputDocumentComponent,
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
    AdminFormModule,
    ReactiveFormsModule, 
  ],
})
export class PH8Module {}
