import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import info from './articles/articlesInfo.json';
import { DeteailService } from '../service/deteail.service';

@Component({
  selector: 'app-moredetailsinfo',
  templateUrl: './moredetailsinfo.page.html',
  styleUrls: ['./moredetailsinfo.page.scss'],
})
export class MoredetailsinfoPage implements OnInit {
  public segment: string = "list1";
  moreInfs: any;
  infoList = info;
  classSize: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    private dataService: DeteailService,
  ) { }

  ngOnInit() {
    console.log("dataSerivce", this.dataService.getData())
    this.moreInfs = this.dataService.getData();
    this.classSize = "fontSize" + localStorage.getItem("fontSize");
    console.log(this.classSize);
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
