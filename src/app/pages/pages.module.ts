import { NgModule } from '@angular/core';
import { DialogService, BackTopModule } from 'ng-devui';
import { SharedModule } from '../@shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DaLayoutModule } from '../@shared/layouts/da-layout';
import { ParseSelectPipe } from './parseFromPipe.pipe'

@NgModule({
  imports: [PagesRoutingModule, SharedModule, BackTopModule, DaLayoutModule],
  declarations: [PagesComponent],
  providers: [DialogService],
})
export class PagesModule {}
