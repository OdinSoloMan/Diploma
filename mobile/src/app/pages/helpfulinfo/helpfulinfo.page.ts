import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeteailService } from '../service/deteail.service';

@Component({
  selector: 'app-helpfulinfo',
  templateUrl: './helpfulinfo.page.html',
  styleUrls: ['./helpfulinfo.page.scss'],
})
export class HelpfulinfoPage implements OnInit {
  textForm: any;

  infos: any;
  constructor(
    private router: Router,
    private dataService: DeteailService,
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
    console.log(event.id);
    this.dataService.setData(event.id)
    this.router.navigateByUrl('/moredetailsinfo')
  }

}
