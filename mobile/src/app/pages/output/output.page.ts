import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-output',
  templateUrl: './output.page.html',
  styleUrls: ['./output.page.scss'],
})
export class OutputPage  {

  constructor(
    private router: Router,
  ) { }

  onExit() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/autoform');
    console.log("exit")
  }
}
