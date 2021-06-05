import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestnewsoreventPageRoutingModule } from './suggestnewsorevent-routing.module';

import { SuggestnewsoreventPage } from './suggestnewsorevent.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SuggestnewsoreventPageRoutingModule,
    TranslateModule
  ],
  declarations: [SuggestnewsoreventPage]
})
export class SuggestnewsoreventPageModule { }
