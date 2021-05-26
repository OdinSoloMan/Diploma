import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../shared.service';
@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  constructor(
    private service: SharedService,
  ) { }

  @Input() user: any;
  guidUsersId: string;
  fullName: string;
  email: string;
  telephone: string;
  position: string;
  typeOfEnterprise: string;
  password: string;
  role: string;
  ngOnInit(): void {
    this.guidUsersId = this.user.guidUsersId;
    this.fullName = this.user.fullName;
    this.email = this.user.email;
    this.telephone = this.user.telephone;
    this.position = this.user.position;
    this.typeOfEnterprise = this.user.typeOfEnterprise;
    this.password = this.user.password;
    this.role = this.user.role;
  }

  addUser() {
    var val = {
      //guidUsersId: this.guidUsersId,
      fullName: this.fullName,
      email: this.email,
      telephone: this.telephone,
      position: this.position,
      typeOfEnterprise: this.typeOfEnterprise,
      password: this.password,
      role: this.role,
    }
    this.service.addUser(val).subscribe(res => {
      console.log(JSON.stringify(res).toString());
      alert(JSON.stringify(res).toString());
    })
  }

  updateUser() {
    var val = {
      guidUsersId: this.guidUsersId,
      fullName: this.fullName,
      email: this.email,
      telephone: this.telephone,
      position: this.position,
      typeOfEnterprise: this.typeOfEnterprise,
      password: this.password,
      role: this.role,
    }
    this.service.updateUser(val).subscribe(res => {
      console.log(JSON.stringify(res).toString());
      alert(JSON.stringify(res).toString());
    })
  }
}
