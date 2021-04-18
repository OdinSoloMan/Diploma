import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfousersPageRoutingModule } from './infousers-routing.module';

import { InfousersPage } from './infousers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InfousersPageRoutingModule
  ],
  declarations: [InfousersPage]
})
export class InfousersPageModule {}
