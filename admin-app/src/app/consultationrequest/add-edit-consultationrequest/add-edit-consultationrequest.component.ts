import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-consultationrequest',
  templateUrl: './add-edit-consultationrequest.component.html',
  styleUrls: ['./add-edit-consultationrequest.component.css']
})
export class AddEditConsultationrequestComponent implements OnInit {

  constructor(
    private service: SharedService,
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
    if(this.isVerified == "true"){
      this.s = true;
    } 
    var val = {
      description: this.description,
      reverseCommunication: this.reverseCommunication,
      isVerified: this.s,
      usersId: this.usersId,
      listServicesId: this.listServicesId,
    }
    this.service.addConsultationrequest(val).subscribe(res => {
      console.log(JSON.stringify(res).toString());
      alert(JSON.stringify(res).toString());
    })
  }

  updateConsultationRequest() {
    this.s = false;
    if(this.isVerified == "true"){
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
    this.service.updateConsultationrequest(val).subscribe(res => {
      console.log(JSON.stringify(res).toString());
      alert(JSON.stringify(res).toString());
    })
  }
}
