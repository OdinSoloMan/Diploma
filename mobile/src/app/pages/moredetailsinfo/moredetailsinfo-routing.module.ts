import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoredetailsinfoPage } from './moredetailsinfo.page';

const routes: Routes = [
  {
    path: '',
    component: MoredetailsinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoredetailsinfoPageRoutingModule {}
