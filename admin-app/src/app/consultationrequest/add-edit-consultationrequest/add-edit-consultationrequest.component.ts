import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  form = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]),
    message: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]),
    reverseCommunication: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(50)]),
    isVerified: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(5), Validators.pattern('[a-zA-Z]*')]),
    usersId: new FormControl('', [Validators.required, Validators.minLength(36), Validators.maxLength(36), Validators.pattern('[\\da-zA-Z]{8}-([\\da-zA-Z]{4}-){3}[\\da-zA-Z]{12}')]),
    listServicesId: new FormControl('', [Validators.required, Validators.minLength(36), Validators.maxLength(36), Validators.pattern('[\\da-zA-Z]{8}-([\\da-zA-Z]{4}-){3}[\\da-zA-Z]{12}')]),
  })

  ngOnInit(): void {
    this.guidConsultationRequestsId = this.consultationrequest.guidConsultationRequestsId;
    this.form.controls['description'].setValue(this.consultationrequest.description);
    this.form.controls['message'].setValue(this.consultationrequest.message);
    this.form.controls['reverseCommunication'].setValue(this.consultationrequest.reverseCommunication);
    this.form.controls['isVerified'].setValue(this.consultationrequest.isVerified);
    this.form.controls['usersId'].setValue(this.consultationrequest.usersId);
    this.form.controls['listServicesId'].setValue(this.consultationrequest.listServicesId);
  }
  
  addConsultationRequest() {
    var val = {
      description: this.form.value.description,
      message: this.form.value.message,
      reverseCommunication: this.form.value.reverseCommunication,
      usersId: this.form.value.usersId,
      listServicesId: this.form.value.listServicesId,
      isVerified: JSON.parse(this.form.value.isVerified),
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
    var val = {
      guidConsultationRequestsId: this.guidConsultationRequestsId,
      description: this.form.value.description,
      message: this.form.value.message,
      reverseCommunication: this.form.value.reverseCommunication,
      usersId: this.form.value.usersId,
      listServicesId: this.form.value.listServicesId,
      isVerified: JSON.parse(this.form.value.isVerified),
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
