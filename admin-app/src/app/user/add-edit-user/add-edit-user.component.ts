import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern('[a-zA-ZА-Яа-я_ ]*')]),
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^(1|1\\s)?(\\d{11}|(\\d{3}\\-){2}\\d{4}|\\(\\d{3}\\)\\s?\\d{3}\\-\\d{4}|(\\d{3}\\s){2}\\d{4})$')]),
    position: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern('[a-zA-ZА-Яа-я]*')]),
    typeOfEnterprise: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern('[a-zA-ZА-Яа-я]*')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(45)]),
    role: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('(admin|users)?')]),
  })

  ngOnInit(): void {
    this.guidUsersId = this.user.guidUsersId;
    this.form.controls['fullName'].setValue(this.user.fullName);
    this.form.controls['email'].setValue(this.user.email);
    this.form.controls['telephone'].setValue(this.user.telephone);
    this.form.controls['position'].setValue(this.user.position);
    this.form.controls['typeOfEnterprise'].setValue(this.user.typeOfEnterprise);
    this.form.controls['password'].setValue(this.user.password);
    this.form.controls['role'].setValue(this.user.role);
  }

  addUser() {
    var val = {
      //guidUsersId: this.guidUsersId,
      fullName: this.form.value.fullName,
      email: this.form.value.email,
      telephone: this.form.value.telephone,
      position: this.form.value.position,
      typeOfEnterprise: this.form.value.typeOfEnterprise,
      password: this.form.value.password,
      role: this.form.value.role,
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
        this.toastr.error(err.error, err.status, {
          timeOut: 500,
          closeButton: true
        });
      }, () => console.log('HTTP request completed.')
    );
  }

  updateUser() {
    var val = {
      guidUsersId: this.guidUsersId,
      fullName: this.form.value.fullName,
      email: this.form.value.email,
      telephone: this.form.value.telephone,
      position: this.form.value.position,
      typeOfEnterprise: this.form.value.typeOfEnterprise,
      password: this.form.value.password,
      role: this.form.value.role,
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
        this.toastr.error(err.error, err.status, {
          timeOut: 500,
          closeButton: true
        });
      }, () => console.log('HTTP request completed.')
    );
  }
}
