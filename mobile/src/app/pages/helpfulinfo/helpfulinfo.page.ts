import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import languageDesign from '../../pages/jsonfile/language-design.json';
import { DeteailService } from '../service/deteail.service';

@Component({
  selector: 'app-helpfulinfo',
  templateUrl: './helpfulinfo.page.html',
  styleUrls: ['./helpfulinfo.page.scss'],
})
export class HelpfulinfoPage implements OnInit {
  language = localStorage.getItem("radioLanguage");
  textForm: any;

  infos: any;
  constructor(
    private router: Router,
    private dataService: DeteailService,
  ) { }

  ngOnInit() {
    this.checkLanguage();
    let info1 = [
      { id: "0", title: "Порядок регистрации ИП" },
      { id: "1", title: "Прекращение деятельности ИП" },
      { id: "2", title: "Внесение изменений в регистрационные данные ИП" }
    ]
    this.infos = info1;
    console.log(info1)
  }

  checkLanguage() {
    if (this.language == "ru") {
      this.textForm = languageDesign.ru.helpfulinfoForm;
    }
    if (this.language == "eng") {
      this.textForm = languageDesign.eng.helpfulinfoForm;
    }
  }

  onClick(event) {
    console.log(event.id);
    this.dataService.setData(event.id)
    this.router.navigateByUrl('/moredetailsinfo')
  }

}
