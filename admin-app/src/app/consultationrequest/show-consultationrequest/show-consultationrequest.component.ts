import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-consultationrequest',
  templateUrl: './show-consultationrequest.component.html',
  styleUrls: ['./show-consultationrequest.component.css']
})
export class ShowConsultationrequestComponent implements OnInit {

  constructor(
    private service: SharedService,
    private toastr: ToastrService,
  ) { }

  ConsultationrequestList: any = [];

  ModalTitle: string;
  ActivateAddEditConsultationrequesComp: boolean = false;
  consultationrequest: any;

  totalRecords: String //
  page: Number = 1 //

  countPage: any = 1;

  guidConsultationRequestsIdDel: any;
  dataItemDel: any;

  ngOnInit(): void {
    console.log(this.countPage)
    this.refrechConsultationrequestList();
  }

  guidConsultationRequestsIdFilter: string = "";
  descriptionFilter: string = "";
  reverseCommunicationFilter: string = "";
  isVerifiedFilter: string = "";
  usersIdFilter: string = "";
  listServicesIdFilter: string = "";
  ConsultationrequestListWithoutFilter: any = [];

  addClick() {
    this.consultationrequest = {
      guidConsultationRequestsId: 0,
      description: '',
      reverseCommunication: '',
      isVerified: '',
      usersId: '',
      listServicesId: '',
    }
    this.ModalTitle = "Add Consultation Request";
    this.ActivateAddEditConsultationrequesComp = true;
  }

  editClick(item) {
    this.consultationrequest = item;
    this.ModalTitle = "Edit Consultation Request"
    this.ActivateAddEditConsultationrequesComp = true;
  }

  deleteItemFn(any) {
    this.guidConsultationRequestsIdDel = any.guidConsultationRequestsId;
    this.dataItemDel = any;
    console.log(any);
  }

  deleteClick(item) {
    const http$ = this.service.deleteConsultationrequest(item.guidConsultationRequestsId);
    http$.subscribe(
      res => {
        console.log('HTTP response', res)
        this.toastr.success('Success', '200', {
          timeOut: 500,
          closeButton: true
        });
        this.refrechConsultationrequestList();
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
    this.ActivateAddEditConsultationrequesComp = false;
    this.refrechConsultationrequestList();
  }

  refrechConsultationrequestList() {
    this.service.getConsultationrequestList().subscribe(data => {
      this.ConsultationrequestList = data;
      this.ConsultationrequestListWithoutFilter = data;
      this.totalRecords = data.length;//
      console.log(this.totalRecords)//
    })
  }

  filterFn() {
    var guidConsultationRequestsIdFilter = this.guidConsultationRequestsIdFilter;
    var descriptionFilter = this.descriptionFilter;
    var reverseCommunicationFilter = this.reverseCommunicationFilter;
    var isVerifiedFilter = this.isVerifiedFilter;
    var usersIdFilter = this.usersIdFilter;
    var listServicesIdFilter = this.listServicesIdFilter;

    this.ConsultationrequestList = this.ConsultationrequestListWithoutFilter.filter(function (el) {
      return el.guidConsultationRequestsId.toString().toLowerCase().includes(
        guidConsultationRequestsIdFilter.toString().trim().toLowerCase()
      ) &&
        el.description.toString().toLowerCase().includes(
          descriptionFilter.toString().trim().toLowerCase()
        ) && el.reverseCommunication.toString().toLowerCase().includes(
          reverseCommunicationFilter.toString().trim().toLowerCase()
        ) && el.isVerified.toString().toLowerCase().includes(
          isVerifiedFilter.toString().trim().toLowerCase()
        ) && el.usersId.toString().toLowerCase().includes(
          usersIdFilter.toString().trim().toLowerCase()
        ) && el.listServicesId.toString().toLowerCase().includes(
          listServicesIdFilter.toString().trim().toLowerCase())
    })
    this.totalRecords = this.ConsultationrequestList.length
  }

  sortResult(prop, asc) {
    this.ConsultationrequestList = this.ConsultationrequestList.sort(function (a, b) {
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
