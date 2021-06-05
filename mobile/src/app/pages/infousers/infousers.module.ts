import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfousersPageRoutingModule } from './infousers-routing.module';

import { InfousersPage } from './infousers.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InfousersPageRoutingModule,
    TranslateModule
  ],
  declarations: [InfousersPage]
})
export class InfousersPageModule {}
