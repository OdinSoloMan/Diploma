import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ShowUserComponent } from './user/show-user/show-user.component';
import { ServiceComponent } from './service/service.component';
import { AddEditServiceComponent } from './service/add-edit-service/add-edit-service.component';
import { AddEditUserComponent } from './user/add-edit-user/add-edit-user.component';
import { ShowServiceComponent } from './service/show-service/show-service.component';

import { SharedService } from './shared.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component'; //

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ShowUserComponent,
    ServiceComponent,
    AddEditServiceComponent,
    ShowServiceComponent,
    AddEditUserComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,//
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
