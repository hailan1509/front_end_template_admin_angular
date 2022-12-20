import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/@shared/shared.module';

import { PH7RoutingModule } from './ph7-routing.module';


import { FieldsRefComponent } from './fields-ref/fields-ref.component';
import { ConfidentialityRefComponent } from './confidentiality-ref/confidentiality-ref.component';
import { AgencyIssuedRefComponent } from './agency-issued-ref/agency-issued-ref.component';
import { ArchivesRefComponent } from './archives-ref/archives-ref.component';
import { DurationStorageRefComponent } from './duration-storage-ref/duration-storage-ref.component';
import { PhysicalConditionRefComponent } from './physical-condition-ref/physical-condition-ref.component';
import { MiningPurposeRefComponent } from './mining-purpose-ref/mining-purpose-ref.component';
import { MiningBookRefComponent } from './mining-book-ref/mining-book-ref.component';
import { DocumentTypeRefComponent } from './document-type-ref/document-type-ref.component';



import {
  DatepickerModule,
  InputNumberModule,
  PaginationModule,
  TooltipModule,
} from 'ng-devui';
import { FormsModule } from '@angular/forms';
import { AdminFormModule } from 'src/app/@shared/components/admin-form';
import { ph7Component } from './ph7.component';


@NgModule({
  declarations: [
    FieldsRefComponent,
    ConfidentialityRefComponent,
    AgencyIssuedRefComponent,
    ArchivesRefComponent,
    DurationStorageRefComponent,
    PhysicalConditionRefComponent,
    MiningPurposeRefComponent,
    MiningBookRefComponent,
    DocumentTypeRefComponent,
    
    ph7Component,

  ],
  imports: [
    CommonModule,
    PH7RoutingModule,

    SharedModule,
    FormsModule,
    PaginationModule,
    AdminFormModule,
    InputNumberModule,
    DatepickerModule,
    TooltipModule,

  ]
})
export class PH7Module { }