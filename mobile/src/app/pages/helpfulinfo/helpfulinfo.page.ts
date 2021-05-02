import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-helpfulinfo',
  templateUrl: './helpfulinfo.page.html',
  styleUrls: ['./helpfulinfo.page.scss'],
})
export class HelpfulinfoPage implements OnInit {
  userAnswer: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onClick(event){
    this.userAnswer = event;
    console.log(event);
    this.router.navigateByUrl('/moredetailsinfo', {state:{title : event}})
  }

}
