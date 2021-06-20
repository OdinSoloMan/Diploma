import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-listservice',
  templateUrl: './show-listservice.component.html',
  styleUrls: ['./show-listservice.component.css']
})
export class ShowListserviceComponent implements OnInit {
  constructor(
    private service: SharedService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ListServiceList: any = [];

  ModalTitle: string;
  ActivateAddEditListServiceComp: boolean = false;
  listservice: any;

  totalRecords: String;
  page: Number = 1;

  countPage: any = 5;

  guidListSevicesIdDel: any;
  dataItemDel: any;

  ngOnInit(): void {
    console.log(this.countPage)
    this.refrechListServiceList();
  }

  guidListSevicesIdFilter: string = "";
  descriptionFilter: string = "";
  servicesIdFilter: string = "";
  nameFilter: string = "";
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
    const http$ = this.service.deleteListService(item.guidListSevicesId);
    http$.subscribe(
      res => {
        console.log('HTTP response', res)
        this.toastr.success('Success', '200', {
          timeOut: 500,
          closeButton: true
        });
        this.refrechListServiceList();
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
    this.ActivateAddEditListServiceComp = false;
    this.refrechListServiceList();
  }


  refrechListServiceList() {
    //this.showNamService()
    const http$ = this.service.postFullInfoListServiceFromName();
    http$.subscribe(
      res => {
        var createInfoListService = [{}];
        var count = 0;
        var lengthRes = JSON.parse(JSON.stringify(res))
        console.log("lengt", lengthRes.length)
        for (let i = 0; i < lengthRes.length; i++) {
          //console.log(a[i].ListServices.length);
          if (lengthRes[i].ListServices.length !== 0) {
            for (let j = 0; j < lengthRes[i].ListServices.length; j++) {
              //console.log("a[i].ListServices[j].length", lengthRes[i].ListServices[j])
              createInfoListService[count] = { ...createInfoListService[count], guidListSevicesId: lengthRes[i].ListServices[j].GuidListSevicesId };
              createInfoListService[count] = { ...createInfoListService[count], description: lengthRes[i].ListServices[j].Description };
              createInfoListService[count] = { ...createInfoListService[count], name: lengthRes[i].Name };
              createInfoListService[count] = { ...createInfoListService[count], servicesId: lengthRes[i].GuidServicesId };
              count++
            }
          }
        }
        console.log("result", createInfoListService)
        this.ListServiceList = createInfoListService;
        this.ListServiceListWithoutFilter = createInfoListService;
        var lengthResLast = JSON.parse(JSON.stringify(createInfoListService))
        this.totalRecords = lengthResLast.length;
        console.log(this.totalRecords)
        console.log('HTTP response', res)
        // this.toastr.success('Yes', 'LIST SERVICE', {
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
    var guidListSevicesIdFilter = this.guidListSevicesIdFilter;
    var descriptionFilter = this.descriptionFilter;
    var servicesIdFilter = this.servicesIdFilter;
    var nameFilter = this.nameFilter;

    this.ListServiceList = this.ListServiceListWithoutFilter.filter(function (el) {
      return el.guidListSevicesId.toString().toLowerCase().includes(
        guidListSevicesIdFilter.toString().trim().toLowerCase()
      ) && el.description.toString().toLowerCase().includes(
        descriptionFilter.toString().trim().toLowerCase()
      ) && el.servicesId.toString().toLowerCase().includes(
        servicesIdFilter.toString().trim().toLowerCase()
      ) && el.name.toString().toLowerCase().includes(
        nameFilter.toString().trim().toLowerCase())
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
