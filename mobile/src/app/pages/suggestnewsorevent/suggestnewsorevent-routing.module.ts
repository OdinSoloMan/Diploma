import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuggestnewsoreventPage } from './suggestnewsorevent.page';

const routes: Routes = [
  {
    path: '',
    component: SuggestnewsoreventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggestnewsoreventPageRoutingModule {}
