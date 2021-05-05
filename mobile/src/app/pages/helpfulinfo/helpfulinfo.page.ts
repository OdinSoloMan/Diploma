import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-helpfulinfo',
  templateUrl: './helpfulinfo.page.html',
  styleUrls: ['./helpfulinfo.page.scss'],
})
export class HelpfulinfoPage implements OnInit {
  infos: any;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    let info1 = [
      { id: "0", title: "Порядок регистрации ИП" },
      { id: "1", title: "Прекращение деятельности ИП" },
      { id: "2", title: "Внесение изменений в регистрационные данные ИП" }
    ]
    this.infos = info1;
    console.log(info1)
  }

  onClick(event) {
    console.log(event);
    this.router.navigateByUrl('/moredetailsinfo', { state: { id: event } })
  }

}
