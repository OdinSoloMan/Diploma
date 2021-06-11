import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-service',
  templateUrl: './show-service.component.html',
  styleUrls: ['./show-service.component.css']
})
export class ShowServiceComponent implements OnInit {

  constructor(
    private serv: SharedService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ServiceList: any = [];

  ModalTitle: string;
  ActivateAddEditServiceComp: boolean = false;
  service: any;

  totalRecords: String
  page: Number = 1

  countPage: any = 5;

  guidServicesIdDel: any;
  dataItemDel: any;

  ngOnInit(): void {

    console.log(this.countPage)
    this.refrechServiceList();
  }

  guidServicesIdFilter: string = "";
  nameFilter: string = "";
  ServiceListWithoutFilter: any = [];

  addClick() {
    this.service = {
      guidServicesId: 0,
      name: '',
    }
    this.ModalTitle = "Add Service"
    this.ActivateAddEditServiceComp = true;
  }

  editClick(item) {
    this.service = item;
    this.ModalTitle = "Edit Service";
    this.ActivateAddEditServiceComp = true;
  }

  deleteItemFn(any) {
    this.guidServicesIdDel = any.guidServicesId;
    this.dataItemDel = any;
    console.log(any);
  }

  deleteClick(item) {
    const http$ = this.serv.deleteService(item.guidServicesId);
    http$.subscribe(
      res => {
        console.log('HTTP response', res)
        this.toastr.success('Success', '200', {
          timeOut: 500,
          closeButton: true
        });
        this.refrechServiceList();
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
    this.ActivateAddEditServiceComp = false;
    this.refrechServiceList();
  }

  refrechServiceList() {
    const http$ = this.serv.getServiceList();
    http$.subscribe(
      res => {
        this.ServiceList = res;
        this.ServiceListWithoutFilter = res;
        this.totalRecords = res.length;
        console.log(this.totalRecords)
        console.log('HTTP response', res)
        // this.toastr.success('Yes', 'Service', {
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
    var guidServicesIdFilter = this.guidServicesIdFilter;
    var nameFilter = this.nameFilter;

    this.ServiceList = this.ServiceListWithoutFilter.filter(function (el) {
      return el.guidServicesId.toString().toLowerCase().includes(
        guidServicesIdFilter.toString().trim().toLocaleLowerCase()
      ) && el.name.toString().toLowerCase().includes(
        nameFilter.toString().trim().toLocaleLowerCase()
      )
    })
    this.totalRecords = this.ServiceList.length
  }

  sortResult(prop, asc) {
    this.ServiceList = this.ServiceList.sort(function (a, b) {
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
  }
}
