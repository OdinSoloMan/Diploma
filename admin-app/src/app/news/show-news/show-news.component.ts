import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-news',
  templateUrl: './show-news.component.html',
  styleUrls: ['./show-news.component.css']
})
export class ShowNewsComponent implements OnInit {

  constructor(private service: SharedService) { }

  NewsList: any = [];

  ModalTitle: string;
  ActivateAddEditNewsComp: boolean = false;
  news: any;

  totalRecords: String;
  page: Number = 1

  countPage: any = 1;
  ngOnInit(): void {
    console.log(this.countPage)
    this.refrechNewsList();
  }

  guidNewsIdFilter: string = "";
  newTitleFilter: string = "";
  newDescriptionFilter: string = "";
  dataNewFilter: string = "";
  imageNewFilter: string = "";
  isConsideredFilter: string = "";
  usersIdFilter: string = "";
  NewsListWithoutFilter: any = [];

  addClick() {
    this.news = {
      guidNewsId: 0,
      newTitle: '',
      newDescription: '',
      dataNew: '',
      imageNew: '',
      isConsidered: '',
      usersId: '',
    }
    this.ModalTitle = "Add News";
    this.ActivateAddEditNewsComp = true;
  }

  editClick(item) {
    this.news = item;
    this.ModalTitle = "Edit News"
    this.ActivateAddEditNewsComp = true;
  }

  deleteClick(item) {
    if (confirm('Are you sure??')) {
      this.service.deleteNews(item.guidNewsId).subscribe(data => {
        alert(JSON.stringify(data).toString());
        this.refrechNewsList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditNewsComp = false;
    this.refrechNewsList();
  }

  refrechNewsList(){
    this.service.getNewsList().subscribe(data => {
      this.NewsList = data;
      this.NewsListWithoutFilter = data;
      this.totalRecords = data.length;
      console.log(this.totalRecords);
    })
  }

  filterFn() {
    var guidNewsIdFilter = this.guidNewsIdFilter;
    var newTitleFilter = this.newTitleFilter;
    var newDescriptionFilter = this.newDescriptionFilter;
    var dataNewFilter = this.dataNewFilter;
    var imageNewFilter = this.imageNewFilter;
    var isConsideredFilter = this.isConsideredFilter;
    var usersIdFilter = this.usersIdFilter;

    this.NewsList = this.NewsListWithoutFilter.filter(function (el) {
      return el.guidNewsId.toString().toLowerCase().includes(
        guidNewsIdFilter.toString().trim().toLowerCase()
      ) &&
        el.newTitle.toString().toLowerCase().includes(
          newTitleFilter.toString().trim().toLowerCase()
        ) && el.newDescription.toString().toLowerCase().includes(
          newDescriptionFilter.toString().trim().toLowerCase()
        ) && el.dataNew.toString().toLowerCase().includes(
          dataNewFilter.toString().trim().toLowerCase()
        ) && el.imageNew.toString().toLowerCase().includes(
          imageNewFilter.toString().trim().toLowerCase()
        ) && el.isConsidered.toString().toLowerCase().includes(
          isConsideredFilter.toString().trim().toLowerCase()
        ) && el.usersId.toString().toLowerCase().includes(
          usersIdFilter.toString().trim().toLowerCase())
    })
    this.totalRecords = this.NewsList.length
  }

  sortResult(prop, asc) {
    this.NewsList = this.NewsList.sort(function (a, b) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0)
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0)
      }
    })
  }

  switchFnCountPage(e){
    console.log(e);
    this.countPage = e;
    //this.countPage;
  }
}
