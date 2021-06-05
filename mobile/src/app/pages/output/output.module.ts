import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutputPageRoutingModule } from './output-routing.module';

import { OutputPage } from './output.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutputPageRoutingModule,
    TranslateModule
  ],
  declarations: [OutputPage]
})
export class OutputPageModule { }
