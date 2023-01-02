import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { PH1RoutingModule } from './ph1-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/@shared/shared.module';

import {
  DatepickerModule,
  InputNumberModule,
  PaginationModule,
  TooltipModule,
  ToastModule
} from 'ng-devui';
import { AdminFormModule } from 'src/app/@shared/components/admin-form/admin-form.module';
import { ph1Component } from './ph1.component';
import { DocumentByProfileComponent } from './document-by-profile/document-by-profile.component';
import { ProfilePendingComponent } from './profile-pending/profile-pending.component';
import { ProfileEditedComponent } from './profile-edited/profile-edited.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { ProfileSearchComponent } from './profile-search/profile-search.component';
import { DocumentSearchComponent } from './document-search/document-search.component';


@NgModule({
  declarations: [
    ProfileEditedComponent,
    ph1Component,
    DocumentByProfileComponent,
    ProfilePendingComponent,
    CreateProfileComponent,
    ProfileSearchComponent,
    DocumentSearchComponent

  ],
  imports: [
    SharedModule,
    FormsModule,
    PaginationModule,
    AdminFormModule,
    ToastModule,
    InputNumberModule,
    DatepickerModule,
    TooltipModule,
    NgxDropzoneModule,
    PH1RoutingModule
  ]
})
export class PH1Module { }
