import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-news',
  templateUrl: './add-edit-news.component.html',
  styleUrls: ['./add-edit-news.component.css']
})
export class AddEditNewsComponent implements OnInit {

  constructor(
    private service: SharedService,
  ) { }

  @Input() news: any;
  guidNewsId: string;
  newTitle: string;
  newDescription: string;
  dataNew: string;
  imageNew: string;
  isConsidered: string;
  usersId: string;
  ngOnInit(): void {
    this.guidNewsId = this.news.guidNewsId;
    this.newTitle = this.news.newTitle;
    this.newDescription = this.news.newDescription;
    this.dataNew = this.news.dataNew;
    this.imageNew = this.news.imageNew;
    this.isConsidered = this.news.isConsidered;
    this.usersId = this.news.usersId;
  }
  s: any = false;
  addNews() {
    this.s = false;
    if(this.isConsidered == "true"){
      this.s = true;
    } 
    var val = {
      newTitle : this.newTitle,
      newDescription : this.newDescription,
      dataNew : this.dataNew,
      imageNew : this.imageNew,
      isConsidered : this.s,
      usersId : this.usersId,
    }
    this.service.addNews(val).subscribe(res => {
      //console.log(JSON.stringify(res).toString());
      alert(JSON.stringify(res).toString());
    })
  }

  updateNews() {
    this.s = false;
    if(this.isConsidered == "true"){
      this.s = true;
    } 
    var val = {
      guidNewsId : this.guidNewsId,
      newTitle : this.newTitle,
      newDescription : this.newDescription,
      dataNew : this.dataNew,
      imageNew : this.imageNew,
      isConsidered : this.s,
      usersId : this.usersId,
    }
    this.service.updateNews(val).subscribe(res => {
      //console.log(JSON.stringify(res).toString());
      alert(JSON.stringify(res).toString());
    })
  }

}
