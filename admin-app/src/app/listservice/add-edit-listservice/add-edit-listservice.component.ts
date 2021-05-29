import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-listservice',
  templateUrl: './add-edit-listservice.component.html',
  styleUrls: ['./add-edit-listservice.component.css']
})
export class AddEditListserviceComponent implements OnInit {

  constructor(
    private service: SharedService,
    private toastr: ToastrService,
  ) { }

  @Input() listservice: any;
  guidListSevicesId: string;
  description: string;
  servicesId: string;
  ngOnInit(): void {
    this.guidListSevicesId = this.listservice.guidListSevicesId;
    this.description = this.listservice.description;
    this.servicesId = this.listservice.servicesId;
  }

  addListService() {
    var val = {
      description: this.description,
      servicesId: this.servicesId,
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

  updateListService() {
    var val = {
      guidListSevicesId: this.guidListSevicesId,
      description: this.description,
      servicesId: this.servicesId,
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
