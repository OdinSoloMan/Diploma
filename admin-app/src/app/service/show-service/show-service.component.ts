import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-service',
  templateUrl: './show-service.component.html',
  styleUrls: ['./show-service.component.css']
})
export class ShowServiceComponent implements OnInit {

  constructor(private serv: SharedService) { }

  ServiceList: any = [];

  ModalTitle: string;
  ActivateAddEditServiceComp: boolean = false;
  service: any;

  totalRecords: String 
  page: Number = 1

  countPage: any = 1;
  ngOnInit(): void {

    console.log(this.countPage)
    this.refrechServiceList();
  }

  guidServicesIdFilter: string = "";
  nameFilter: string = "";
  ServiceListWithoutFilter: any = [];

  addClick(){
    this.service = {
      guidServicesId: 0,
      name: '',
    }
    this.ModalTitle = "Add Service"
    this.ActivateAddEditServiceComp = true;
  }

  editClick(item){
    this.service = item;
    this.ModalTitle = "Edit Service";
    this.ActivateAddEditServiceComp = true;
  }

  deleteClick(item){
    console.log(item)
    if(confirm('Are you sure??')){
      this.serv.deleteService(item.guidServicesId).subscribe(data => {
        alert(JSON.stringify(data).toString());
        this.refrechServiceList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditServiceComp = false;
    this.refrechServiceList();
  }

  refrechServiceList(){
    this.serv.getServiceList().subscribe(data => {
      this.ServiceList = data;
      this.ServiceListWithoutFilter = data;
      this.totalRecords = data.length;
      console.log(this.totalRecords)
    })
  }

  filterFn(){
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

  sortResult(prop, asc){
    this.ServiceList = this.ServiceList.sort(function (a, b) {
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
  }
}
