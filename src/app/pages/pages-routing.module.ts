import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './abnormal/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'quan-ly',
        loadChildren: () =>
          import('./list/list.module').then((m) => m.ListModule),
      },
      {
        path: 'PH1',
        loadChildren: () =>
          import('./ph1/ph1.module').then((m) => m.PH1Module),
      },
      {
        path: 'PH2',
        loadChildren: () =>
          import('./ph2/ph2.module').then((m) => m.PH2Module),
      },
      {
        path: 'PH3',
        loadChildren: () =>
          import('./ph3/ph3.module').then((m) => m.ph3Module),
      },
      {
        path: 'PH4',
        loadChildren: () =>
          import('./ph4/ph4.module').then((m) => m.PH4Module),
      },
      {
        path: 'PH5',
        loadChildren: () =>
          import('./ph5/ph5.module').then((m) => m.PH5Module),
      },
      {
        path: 'PH6',
        loadChildren: () =>
          import('./ph6/ph6.module').then((m) => m.PH6Module),
      },
      {
        path: 'PH7',
        loadChildren: () =>
          import('./ph7/ph7.module').then((m) => m.PH7Module),
      },
      {
        path: 'PH8',
        loadChildren: () =>
          import('./ph8/ph8.module').then((m) => m.PH8Module),
      },
      {
        path: 'PH9',
        loadChildren: () =>
          import('./ph9/ph9.module').then((m) => m.PH9Module),
      },
      {
        path: 'abnormal',
        loadChildren: () =>
          import('./abnormal/abnormal.module').then((m) => m.AbnormalModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
