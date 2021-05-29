import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared.service';
@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  constructor(
    private service: SharedService,
    private toastr: ToastrService,
  ) { }

  @Input() user: any;
  guidUsersId: string;
  fullName: string;
  email: string;
  telephone: string;
  position: string;
  typeOfEnterprise: string;
  password: string;
  role: string;
  ngOnInit(): void {
    this.guidUsersId = this.user.guidUsersId;
    this.fullName = this.user.fullName;
    this.email = this.user.email;
    this.telephone = this.user.telephone;
    this.position = this.user.position;
    this.typeOfEnterprise = this.user.typeOfEnterprise;
    this.password = this.user.password;
    this.role = this.user.role;
  }

  addUser() {
    var val = {
      //guidUsersId: this.guidUsersId,
      fullName: this.fullName,
      email: this.email,
      telephone: this.telephone,
      position: this.position,
      typeOfEnterprise: this.typeOfEnterprise,
      password: this.password,
      role: this.role,
    }

    const http$ = this.service.addUser(val);
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

  updateUser() {
    var val = {
      guidUsersId: this.guidUsersId,
      fullName: this.fullName,
      email: this.email,
      telephone: this.telephone,
      position: this.position,
      typeOfEnterprise: this.typeOfEnterprise,
      password: this.password,
      role: this.role,
    }

    const http$ = this.service.updateUser(val);
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
