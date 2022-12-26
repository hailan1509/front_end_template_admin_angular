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
} from 'ng-devui';
import { AdminFormModule } from 'src/app/@shared/components/admin-form/admin-form.module';
import { ph1Component } from './ph1.component';
import { ProfilePendingComponent } from './profile-pending/profile-pending.component';
import { ProfileEditedComponent } from './profile-edited/profile-edited.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';


@NgModule({
  declarations: [
    ProfileEditedComponent,
    ph1Component,
    ProfilePendingComponent,
    CreateProfileComponent

  ],
  imports: [
    SharedModule,
    FormsModule,
    PaginationModule,
    AdminFormModule,
    InputNumberModule,
    DatepickerModule,
    TooltipModule,
    NgxDropzoneModule,
    PH1RoutingModule
  ]
})
export class PH1Module { }
