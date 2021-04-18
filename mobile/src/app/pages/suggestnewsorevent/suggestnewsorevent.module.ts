import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestnewsoreventPageRoutingModule } from './suggestnewsorevent-routing.module';

import { SuggestnewsoreventPage } from './suggestnewsorevent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SuggestnewsoreventPageRoutingModule
  ],
  declarations: [SuggestnewsoreventPage]
})
export class SuggestnewsoreventPageModule {}
