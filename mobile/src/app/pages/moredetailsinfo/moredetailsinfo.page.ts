import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-moredetailsinfo',
  templateUrl: './moredetailsinfo.page.html',
  styleUrls: ['./moredetailsinfo.page.scss'],
})
export class MoredetailsinfoPage implements OnInit {
  state$: Observable<object>;

  constructor(public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
      console.log(window.history.state);
  }

}
