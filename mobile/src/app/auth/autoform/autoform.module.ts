import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoformPageRoutingModule } from './autoform-routing.module';

import { AutoformPage } from './autoform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutoformPageRoutingModule
  ],
  declarations: [AutoformPage]
})
export class AutoformPageModule {}
