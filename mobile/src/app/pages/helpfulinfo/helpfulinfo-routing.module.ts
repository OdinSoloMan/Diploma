import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpfulinfoPage } from './helpfulinfo.page';

const routes: Routes = [
  {
    path: '',
    component: HelpfulinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpfulinfoPageRoutingModule {}
