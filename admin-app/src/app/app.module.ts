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
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ListserviceComponent } from './listservice/listservice.component';
import { AddEditListserviceComponent } from './listservice/add-edit-listservice/add-edit-listservice.component';
import { ShowListserviceComponent } from './listservice/show-listservice/show-listservice.component';
import { ConsultationrequestComponent } from './consultationrequest/consultationrequest.component';
import { ShowConsultationrequestComponent } from './consultationrequest/show-consultationrequest/show-consultationrequest.component';
import { AddEditConsultationrequestComponent } from './consultationrequest/add-edit-consultationrequest/add-edit-consultationrequest.component';
import { NewsComponent } from './news/news.component';
import { AddEditNewsComponent } from './news/add-edit-news/add-edit-news.component';
import { ShowNewsComponent } from './news/show-news/show-news.component';
import { EventComponent } from './event/event.component';
import { ShowEventComponent } from './event/show-event/show-event.component';
import { AddEditEventComponent } from './event/add-edit-event/add-edit-event.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { EmailConsultationrequestComponent } from './consultationrequest/email-consultationrequest/email-consultationrequest.component';

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
    LoginComponent,
    ListserviceComponent,
    AddEditListserviceComponent,
    ShowListserviceComponent,
    ConsultationrequestComponent,
    ShowConsultationrequestComponent,
    AddEditConsultationrequestComponent,
    NewsComponent,
    AddEditNewsComponent,
    ShowNewsComponent,
    EventComponent,
    ShowEventComponent,
    AddEditEventComponent,
    EmailConsultationrequestComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,//
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing'
    }), // ToastrModule added
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
