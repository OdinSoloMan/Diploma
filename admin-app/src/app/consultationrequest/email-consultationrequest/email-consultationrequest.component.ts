import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-email-consultationrequest',
  templateUrl: './email-consultationrequest.component.html',
  styleUrls: ['./email-consultationrequest.component.css']
})
export class EmailConsultationrequestComponent implements OnInit {

  constructor(
    private service: SharedService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  @Input() consultationrequest: any;
  guidConsultationRequestsId: string;
  guidConsultationRequestslistServicesId: string;
  guidusersId: string;

  consultation: any = [];

  form = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]),
    message: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]),
    reverseCommunication: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(50)]),
  })

  ngOnInit(): void {
    this.guidConsultationRequestsId = this.consultationrequest.guidConsultationRequestsId;
    this.guidConsultationRequestslistServicesId = this.consultationrequest.listServicesId;
    this.guidusersId = this.consultationrequest.usersId
    this.getInfUserAndListService(this.guidusersId, this.guidConsultationRequestslistServicesId)
    this.form.controls['description'].setValue(this.consultationrequest.description);
    this.form.controls['reverseCommunication'].setValue(this.consultationrequest.reverseCommunication);
  }

  getInfUserAndListService(guid_user, guid_listserve) {
    console.log(guid_user, guid_listserve);
    const http$ = this.service.getInfUserAndListService({
      guiduser: guid_user,
      guidlistservice: guid_listserve
    });

    http$.subscribe(
      res => {
        console.log('HTTP response USER', res)
        this.consultation = {
          listservice: res.listservice.description,
          fullname: res.userinfo.fullName
        }
        console.log(this.consultation)
      }, err => {
        console.log('HTTP Error', err)
        this.toastr.error('Eror', err.status, {
          timeOut: 500,
          closeButton: true
        });
        if (err.status == 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          this.router.navigateByUrl("login");
        }
      }, () => console.log('HTTP request completed.')
    );
  }

  emailUpdate() {
    console.log(this.consultation.listservice)
    const http$ = this.service.mailMesseage({
      guidconsultation: this.guidConsultationRequestsId,
      message: this.form.value.message,
      theme: this.consultation.listservice
    });

    http$.subscribe(
      res => {
        console.log('HTTP response USER', res)
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
        if (err.status == 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          this.router.navigateByUrl("login");
        }
      }, () => console.log('HTTP request completed.')
    );
  }
}
