import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-consultationrequest',
  templateUrl: './add-edit-consultationrequest.component.html',
  styleUrls: ['./add-edit-consultationrequest.component.css']
})
export class AddEditConsultationrequestComponent implements OnInit {

  constructor(
    private service: SharedService,
    private toastr: ToastrService,
  ) { }

  @Input() consultationrequest: any;
  guidConsultationRequestsId: string;
  description: string;
  reverseCommunication: string;
  isVerified: string;
  usersId: string;
  listServicesId: string;
  ngOnInit(): void {
    this.guidConsultationRequestsId = this.consultationrequest.guidConsultationRequestsId;
    this.description = this.consultationrequest.description;
    this.reverseCommunication = this.consultationrequest.reverseCommunication;
    this.isVerified = this.consultationrequest.isVerified;
    this.usersId = this.consultationrequest.usersId;
    this.listServicesId = this.consultationrequest.listServicesId;
  }
  s: any = false;
  addConsultationRequest() {
    this.s = false;
    if (this.isVerified == "true") {
      this.s = true;
    }
    var val = {
      description: this.description,
      reverseCommunication: this.reverseCommunication,
      isVerified: this.s,
      usersId: this.usersId,
      listServicesId: this.listServicesId,
    }

    const http$ = this.service.addConsultationrequest(val);
    http$.subscribe(
      res => {
        console.log('HTTP response', res)
        this.toastr.success('Success', '200', {
          timeOut: 500,
          closeButton: true
        });
      }, err => {
        console.log('HTTP Error', err)
        this.toastr.error('Eror', err.status, {
          timeOut: 500,
          closeButton: true
        });
      }, () => console.log('HTTP request completed.')
    );
  }

  updateConsultationRequest() {
    this.s = false;
    if (this.isVerified == "true") {
      this.s = true;
    }
    var val = {
      guidConsultationRequestsId: this.guidConsultationRequestsId,
      description: this.description,
      reverseCommunication: this.reverseCommunication,
      isVerified: this.s,
      usersId: this.usersId,
      listServicesId: this.listServicesId,
    }
    
    const http$ = this.service.updateConsultationrequest(val);
    http$.subscribe(
      res => {
        console.log('HTTP response', res)
        this.toastr.success('Success', '200', {
          timeOut: 500,
          closeButton: true
        });
      }, err => {
        console.log('HTTP Error', err)
        this.toastr.error('Eror', err.status, {
          timeOut: 500,
          closeButton: true
        });
      }, () => console.log('HTTP request completed.')
    );
  }
}
