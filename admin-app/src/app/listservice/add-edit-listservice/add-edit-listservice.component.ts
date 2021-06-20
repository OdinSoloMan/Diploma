import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-listservice',
  templateUrl: './add-edit-listservice.component.html',
  styleUrls: ['./add-edit-listservice.component.css']
})
export class AddEditListserviceComponent implements OnInit {
  serv: any;
  sName: any;
  constructor(
    private service: SharedService,
    private toastr: ToastrService,
  ) { }

  @Input() listservice: any;
  guidListSevicesId: string;

  form = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(70), Validators.pattern('[a-zA-ZА-Яа-я_ ]*')]),
    servicesId: new FormControl('', [Validators.required, Validators.minLength(36), Validators.maxLength(36), Validators.pattern('[\\da-zA-Z]{8}-([\\da-zA-Z]{4}-){3}[\\da-zA-Z]{12}')]),
    name: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    this.servic()
    this.guidListSevicesId = this.listservice.guidListSevicesId;
    this.form.controls['description'].setValue(this.listservice.description);
    this.form.controls['servicesId'].setValue(this.listservice.servicesId);
  }

  servic() {
    const http$ = this.service.getServiceList();
    http$.subscribe(
      res => {
        this.serv = res;
        //console.log("aaa", res)
        if (this.guidListSevicesId != null) {
          for (let i = 0; i < Object.keys(this.serv).length; i++) {
            // console.log(this.listservice.servicesId, this.serv[i].guidServicesId)
            if (this.serv[i].guidServicesId === this.listservice.servicesId) {
              this.form.controls['name'].setValue(this.serv[i].name);
            }
          }
        }
      }, err => {
        console.log('HTTP Error', err)
        err.status
        this.toastr.error('Eror', err.status, {
          timeOut: 500,
          closeButton: true
        });
      }, () => console.log('HTTP request completed.')
    );
  }
  addListService() {
    var val = {
      description: this.form.value.description,
      servicesId: this.form.value.servicesId,
    }

    const http$ = this.service.addListService(val);
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

  infoName(e) {
    this.form.controls['name'].setValue(e.name);
    this.form.controls['servicesId'].setValue(e.guidServicesId);
  }

  updateListService() {
    var val = {
      guidListSevicesId: this.guidListSevicesId,
      description: this.form.value.description,
      servicesId: this.form.value.servicesId,
    }

    const http$ = this.service.updateListService(val);
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
