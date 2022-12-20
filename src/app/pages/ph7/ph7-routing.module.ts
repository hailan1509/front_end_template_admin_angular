import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FieldsRefComponent } from './fields-ref/fields-ref.component';
import { ConfidentialityRefComponent } from './confidentiality-ref/confidentiality-ref.component';
import { AgencyIssuedRefComponent } from './agency-issued-ref/agency-issued-ref.component';
import { ArchivesRefComponent } from './archives-ref/archives-ref.component';
import { DurationStorageRefComponent } from './duration-storage-ref/duration-storage-ref.component';
import { PhysicalConditionRefComponent } from './physical-condition-ref/physical-condition-ref.component';
import {MiningPurposeRefComponent } from './mining-purpose-ref/mining-purpose-ref.component';
import {MiningBookRefComponent } from './mining-book-ref/mining-book-ref.component';
import {DocumentTypeRefComponent } from './document-type-ref/document-type-ref.component';

import { ph7Component } from './ph7.component';


const routes: Routes = [
  {
    path: '',
    component: ph7Component,
    children: [
      { path: 'qllv', component: FieldsRefComponent },
      { path: 'qldm', component: ConfidentialityRefComponent },
      { path: 'qlcqbh', component: AgencyIssuedRefComponent },
      { path: 'qlklt', component: ArchivesRefComponent },
      { path: 'qlthlt', component: DurationStorageRefComponent },
      { path: 'qlttvl', component: PhysicalConditionRefComponent },
      { path: 'qlmdkt', component: MiningPurposeRefComponent },
      { path: 'qlskt', component: MiningBookRefComponent },
      { path: 'qllhsvb', component: DocumentTypeRefComponent },
  
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PH7RoutingModule { }