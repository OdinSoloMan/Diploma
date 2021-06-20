import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplyServicePageRoutingModule } from './apply-service-routing.module';

import { ApplyServicePage } from './apply-service.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ApplyServicePageRoutingModule,
    TranslateModule
  ],
  declarations: [ApplyServicePage]
})
export class ApplyServicePageModule {}
