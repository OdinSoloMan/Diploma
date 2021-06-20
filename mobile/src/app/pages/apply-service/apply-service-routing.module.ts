import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplyServicePage } from './apply-service.page';

const routes: Routes = [
  {
    path: '',
    component: ApplyServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplyServicePageRoutingModule {}
