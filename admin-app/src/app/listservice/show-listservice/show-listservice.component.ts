import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-listservice',
  templateUrl: './show-listservice.component.html',
  styleUrls: ['./show-listservice.component.css']
})
export class ShowListserviceComponent implements OnInit {

  constructor(private service: SharedService) { }

  ListServiceList: any = [];

  ModalTitle: string;
  ActivateAddEditListServiceComp: boolean = false;
  listservice: any;

  totalRecords: String;
  page: Number = 1;

  countPage: any = 1;

  guidListSevicesIdDel: any;
  dataItemDel: any;

  ngOnInit(): void {
    console.log(this.countPage)
    this.refrechListServiceList();
  }

  guidListSevicesIdFilter: string = "";
  descriptionFilter: string = "";
  servicesIdFilter: string = "";
  ListServiceListWithoutFilter: any = [];

  addClick() {
    this.listservice = {
      guidListSevicesId: 0,
      description: '',
      servicesId: '',
    }
    this.ModalTitle = "Add List Service";
    this.ActivateAddEditListServiceComp = true;
  }

  editClick(item) {
    this.listservice = item;
    this.ModalTitle = "Edit List Service"
    this.ActivateAddEditListServiceComp = true;
  }

  deleteItemFn(any) {
    this.guidListSevicesIdDel = any.guidListSevicesId;
    this.dataItemDel = any;
    console.log(any);
  }

  deleteClick(item) {
    this.service.deleteListService(item.guidListSevicesId).subscribe(data => {
      console.log(data)
      this.refrechListServiceList();
    })
  }

  closeClick() {
    this.ActivateAddEditListServiceComp = false;
    this.refrechListServiceList();
  }

  refrechListServiceList() {
    this.service.getListServiceList().subscribe(data => {
      this.ListServiceList = data;
      this.ListServiceListWithoutFilter = data;
      this.totalRecords = data.length;
      console.log(this.totalRecords);
    })
  }

  filterFn() {
    var guidListSevicesIdFilter = this.guidListSevicesIdFilter;
    var descriptionFilter = this.descriptionFilter;
    var servicesIdFilter = this.servicesIdFilter;

    this.ListServiceList = this.ListServiceListWithoutFilter.filter(function (el) {
      return el.guidListSevicesId.toString().toLowerCase().includes(
        guidListSevicesIdFilter.toString().trim().toLowerCase()
      ) && el.description.toString().toLowerCase().includes(
        descriptionFilter.toString().trim().toLowerCase()
      ) && el.servicesId.toString().toLowerCase().includes(
        servicesIdFilter.toString().trim().toLowerCase())
    })
    this.totalRecords = this.ListServiceList.length;
  }

  sortResult(prop, asc) {
    this.ListServiceList = this.ListServiceList.sort(function (a, b) {
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
