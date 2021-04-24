import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpfulinfoPageRoutingModule } from './helpfulinfo-routing.module';

import { HelpfulinfoPage } from './helpfulinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpfulinfoPageRoutingModule
  ],
  declarations: [HelpfulinfoPage]
})
export class HelpfulinfoPageModule {}
