import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-service',
  templateUrl: './add-edit-service.component.html',
  styleUrls: ['./add-edit-service.component.css']
})
export class AddEditServiceComponent implements OnInit {

  constructor(
    private serv: SharedService,
    private toastr: ToastrService,
  ) { }

  @Input() service: any;
  guidServicesId: string;
  
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('[a-zA-ZА-Яа-я_ ]*')]),
  })

  ngOnInit(): void {
    this.guidServicesId = this.service.guidServicesId;
    this.form.controls['name'].setValue(this.service.name);
  }

  addService() {
    var val = {
      name: this.form.value.name,
    }
    const http$ = this.serv.addService(val);
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

  updateService() {
    var val = {
      guidServicesId: this.guidServicesId,
      name: this.form.value.name,
    }
    const http$ = this.serv.updateService(val);
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
