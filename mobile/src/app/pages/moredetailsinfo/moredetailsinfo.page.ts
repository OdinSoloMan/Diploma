import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import info from './articles/articlesInfo.json';
import languageDesign from '../../pages/jsonfile/language-design.json';
import { Input } from '@angular/core';
import { DeteailService } from '../service/deteail.service';

@Component({
  selector: 'app-moredetailsinfo',
  templateUrl: './moredetailsinfo.page.html',
  styleUrls: ['./moredetailsinfo.page.scss'],
})
export class MoredetailsinfoPage implements OnInit {
  language = localStorage.getItem("radioLanguage");
  textForm: any;
  public segment: string = "list1";
  moreInfs: any;
  infoList = info;
  classSize: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    private dataService: DeteailService,
  ) { }

  ngOnInit() {
    this.checkLanguage();
    console.log("dataSerivce",this.dataService.getData())
    this.moreInfs = this.dataService.getData();
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
