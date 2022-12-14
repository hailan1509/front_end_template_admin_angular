import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/@shared/shared.module';
import {
  DatepickerModule,
  InputNumberModule,
  PaginationModule,
  TooltipModule,
} from 'ng-devui';
import { AdminFormModule } from 'src/app/@shared/components/admin-form/admin-form.module';
import { PH4RoutingModule } from './ph4-routing.module';
import { MiningBookComponent } from './mining-book/mining-book.component';
import { ph4Component } from './ph4.component';


@NgModule({
  declarations: [
    MiningBookComponent,
    ph4Component,
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
  ]
})
export class PH4Module { }
