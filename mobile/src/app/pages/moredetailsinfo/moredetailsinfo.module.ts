import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoredetailsinfoPageRoutingModule } from './moredetailsinfo-routing.module';

import { MoredetailsinfoPage } from './moredetailsinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoredetailsinfoPageRoutingModule
  ],
  declarations: [MoredetailsinfoPage]
})
export class MoredetailsinfoPageModule {}
