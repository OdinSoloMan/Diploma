import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-news',
  templateUrl: './show-news.component.html',
  styleUrls: ['./show-news.component.css']
})
export class ShowNewsComponent implements OnInit {

  constructor(
    private service: SharedService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  NewsList: any = [];

  ModalTitle: string;
  ActivateAddEditNewsComp: boolean = false;
  news: any;

  totalRecords: String;
  page: Number = 1

  countPage: any = 5;

  guidNewsIdDel: any;
  dataItemDel: any;

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

  deleteItemFn(any) {
    this.guidNewsIdDel = any.guidNewsId;
    this.dataItemDel = any;
    console.log(any);
  }

  deleteClick(item) {
    const http$ = this.service.deleteNews(item.guidNewsId);
    http$.subscribe(
      res => {
        console.log('HTTP response', res)
        this.toastr.success('Success', '200', {
          timeOut: 500,
          closeButton: true
        });
        this.refrechNewsList();
      }, err => {
        console.log('HTTP Error', err)
        this.toastr.error('Eror', err.status, {
          timeOut: 500,
          closeButton: true
        });
      }, () => console.log('HTTP request completed.')
    );
  }

  closeClick() {
    this.ActivateAddEditNewsComp = false;
    this.refrechNewsList();
  }

  refrechNewsList() {
    const http$ = this.service.getNewsList();
    http$.subscribe(
      res => {
        this.NewsList = res;
        this.NewsListWithoutFilter = res;
        this.totalRecords = res.length;
        console.log(this.totalRecords)
        console.log('HTTP response', res)
        // this.toastr.success('Yes', 'News', {
        //   timeOut: 500,
        //   closeButton: true
        // });
      }, err => {
        console.log('HTTP Error', err)
        err.status
        this.toastr.error('Eror', err.status, {
          timeOut: 500,
          closeButton: true
        });
        if (err.status == 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          this.router.navigateByUrl("login");
        }
      }, () => console.log('HTTP request completed.')
    );
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

  switchFnCountPage(e) {
    console.log(e);
    this.countPage = e;
    //this.countPage;
  }
}
