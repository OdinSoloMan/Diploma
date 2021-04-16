import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoformPage } from './autoform.page';

const routes: Routes = [
  {
    path: '',
    component: AutoformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoformPageRoutingModule {}
