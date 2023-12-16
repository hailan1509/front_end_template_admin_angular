import { NgModule } from '@angular/core';
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
import { PH4RoutingModule } from './ph4-routing.module';
import { MiningBookComponent } from './mining-book/mining-book.component';
import { ph4Component } from './ph4.component';
// import {ParseSelectPipe} from 'src/app/pages/parseFromPipe.pipe';
import { ProposeProfileComponent } from './propose-profile/propose-profile.component';

@NgModule({
  declarations: [
    MiningBookComponent,
    ph4Component,
    ProposeProfileComponent,
    // ParseSelectPipe
  ],
  imports: [
    // CommonModule,
    SharedModule,
    FormsModule,
    PaginationModule,
    AdminFormModule,
    InputNumberModule,
    DatepickerModule,
    TooltipModule,
    PH4RoutingModule,
    ToastModule
  ]
})
export class PH4Module { }
