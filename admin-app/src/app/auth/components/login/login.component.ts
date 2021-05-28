import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { SharedService } from '../../../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  constructor(
    private router: Router, 
    private service: SharedService,
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
    console.log(this.loginForm.value)
    this.service.login(this.loginForm.value).subscribe((response) => {
      localStorage.setItem('token', response["token"])
      localStorage.setItem('user_id', response["guid"])
      this.router.navigateByUrl('user')
    })
  }
}
