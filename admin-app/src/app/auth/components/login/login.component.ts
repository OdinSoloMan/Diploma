import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(45)]),
  })

  constructor(
    private router: Router,
    private service: SharedService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.checkInLogin();
  }

  checkInLogin() {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/user')
    }
  }

  onSubmit() {
    const http$ = this.service.login(this.form.value);

    http$.subscribe(
      res => {
        console.log('HTTP response', res)
        this.toastr.success('Success', '200', {
          timeOut: 500,
          closeButton: true
        });
        localStorage.setItem('token', res["token"])
        localStorage.setItem('user_id', res["guid"])
        this.router.navigateByUrl('user')
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
