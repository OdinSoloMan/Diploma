import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import info from './articles/articlesInfo.json';
import languageDesign from '../../pages/jsonfile/language-design.json';

@Component({
  selector: 'app-moredetailsinfo',
  templateUrl: './moredetailsinfo.page.html',
  styleUrls: ['./moredetailsinfo.page.scss'],
})
export class MoredetailsinfoPage implements OnInit {
  language = localStorage.getItem("radioLanguage");
  textForm: any;
  public segment: string = "list1";
  state: Observable<object>;
  moreInfs: any;
  infoList = info;
  classSize: any;
  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.checkLanguage();
    this.state = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
    console.log("ww", window.history.state.id);

    console.log(this.infoList[0]);
    this.moreInfs = window.history.state.id;
    this.classSize = "fontSize" + localStorage.getItem("fontSize");
    console.log(this.classSize);
  }

  checkLanguage() {
    if (this.language == "ru") {
      this.textForm = languageDesign.ru.moredetailsinForm;
    }
    if (this.language == "eng") {
      this.textForm = languageDesign.eng.moredetailsinForm;
    }
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
