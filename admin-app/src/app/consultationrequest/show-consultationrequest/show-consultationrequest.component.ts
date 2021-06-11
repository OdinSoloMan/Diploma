import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
  ) { }

  ConsultationrequestList: any = [];
  consultation: any = [];

  ModalTitle: string;
  ActivateAddEditConsultationrequesComp: boolean = false;
  consultationrequest: any;

  totalRecords: String //
  page: Number = 1 //

  countPage: any = 5;

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

  emailConsul(item) {
    this.consultationrequest = item;
    this.ModalTitle = "Email Consultation Request"
    this.ActivateAddEditConsultationrequesComp = true;
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
    const http$ = this.service.getConsultationrequestList();
    http$.subscribe(
      res => {
        this.ConsultationrequestList = res;
        this.ConsultationrequestListWithoutFilter = res;
        this.totalRecords = res.length;//
        console.log(this.totalRecords)
        console.log('HTTP response', res)
        // this.toastr.success('Yes', 'Consultation request List', {
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

  isNumber(val: any): boolean {
    return !(val instanceof Array) && (val - parseFloat(val) + 1) >= 0;
  }

  telephone(any) {
    console.log(any);
    const http$ = this.service.getInfUserAndListService({
      guiduser: any.usersId,
      guidlistservice: any.listServicesId
    });

    http$.subscribe(
      res => {
        console.log('HTTP response USER', res)
        this.consultation = {
          guidConsul: any.guidConsultationRequestsId,
          fullname: res.userinfo.fullName,
          phone: any.reverseCommunication,
          namelistservice: res.listservice.description,
          description: any.description,
        }
        console.log(this.consultation)
      }, err => {
        console.log('HTTP Error', err)
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

  updatePhone(any) {
    console.log(any);
    const http$ = this.service.updateConsultationStatus(
      any
    );

    http$.subscribe(
      res => {
        console.log('HTTP response USER', res)
        this.toastr.success('Yes', 'Update consultation request status', {
          timeOut: 500,
          closeButton: true
        });
        this.refrechConsultationrequestList()
      }, err => {
        console.log('HTTP Error', err)
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
}
