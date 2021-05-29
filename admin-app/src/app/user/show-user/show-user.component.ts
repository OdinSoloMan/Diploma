import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  constructor(private service: SharedService) { }

  UserList: any = [];

  ModalTitle: string;
  ActivateAddEditUserComp: boolean = false;
  user: any;

  totalRecords: String //
  page: Number = 1 //

  countPage: any = 1;

  guidUsersIdDel: any;
  dataItemDel: any;

  ngOnInit(): void {

    console.log(this.countPage)
    this.refrechUserList();
  }

  guidUsersIdFilter: string = "";
  fullNameFilter: string = "";
  emailFilter: string = "";
  telephoneFilter: string = "";
  positionFilter: string = "";
  typeOfEnterpriseFilter: string = "";
  passwordFilter: string = "";
  roleFilter: string = "";
  UserListWithoutFilter: any = [];

  addClick() {
    this.user = {
      guidUsersId: 0,
      fullName: '',
      email: '',
      telephone: '',
      position: '',
      typeOfEnterprise: '',
      password: '',
      role: '',
    }
    this.ModalTitle = "Add User";
    this.ActivateAddEditUserComp = true;
  }

  editClick(item) {
    this.user = item;
    this.ModalTitle = "Edit User"
    this.ActivateAddEditUserComp = true;
  }

  deleteItemFn(any){
    this.guidUsersIdDel = any.guidUsersId;
    this.dataItemDel = any;
    console.log(any);
  }

  deleteClick(item) {
    this.service.deleteUser(item.guidUsersId).subscribe(data => {
      console.log(data)
      this.refrechUserList();
    })
  }

  closeClick() {
    this.ActivateAddEditUserComp = false;
    this.refrechUserList();
  }

  refrechUserList() {
    this.service.getUserList().subscribe(data => {
      this.UserList = data;
      this.UserListWithoutFilter = data;
      this.totalRecords = data.length;//
      console.log(this.totalRecords)//
    })
  }

  filterFn() {
    var guidUsersIdFilter = this.guidUsersIdFilter;
    var fullNameFilter = this.fullNameFilter;
    var emailFilter = this.emailFilter;
    var telephoneFilter = this.telephoneFilter;
    var positionFilter = this.positionFilter;
    var typeOfEnterpriseFilter = this.typeOfEnterpriseFilter;
    var passwordFilter = this.passwordFilter;
    var roleFilter = this.roleFilter;

    this.UserList = this.UserListWithoutFilter.filter(function (el) {
      return el.guidUsersId.toString().toLowerCase().includes(
        guidUsersIdFilter.toString().trim().toLowerCase()
      ) &&
        el.fullName.toString().toLowerCase().includes(
          fullNameFilter.toString().trim().toLowerCase()
        ) && el.email.toString().toLowerCase().includes(
          emailFilter.toString().trim().toLowerCase()
        ) && el.telephone.toString().toLowerCase().includes(
          telephoneFilter.toString().trim().toLowerCase()
        ) && el.position.toString().toLowerCase().includes(
          positionFilter.toString().trim().toLowerCase()
        ) && el.typeOfEnterprise.toString().toLowerCase().includes(
          typeOfEnterpriseFilter.toString().trim().toLowerCase()
        ) && el.password.toString().toLowerCase().includes(
          passwordFilter.toString().trim().toLowerCase()
        ) && el.role.toString().toLowerCase().includes(
          roleFilter.toString().trim().toLowerCase())
    })
    this.totalRecords = this.UserList.length
    //console.log(this.UserList.length)
  }

  sortResult(prop, asc) {
    this.UserList = this.UserList.sort(function (a, b) {
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
