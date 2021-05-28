import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-listservice',
  templateUrl: './add-edit-listservice.component.html',
  styleUrls: ['./add-edit-listservice.component.css']
})
export class AddEditListserviceComponent implements OnInit {

  constructor(
    private service: SharedService,
  ) { }

  @Input() listservice: any;
  guidListSevicesId: string;
  description: string;
  servicesId: string;
  ngOnInit(): void {
    this.guidListSevicesId = this.listservice.guidListSevicesId;
    this.description = this.listservice.description;
    this.servicesId = this.listservice.servicesId;
  }

  addListService() {
    var val = {
      description: this.description,
      servicesId: this.servicesId,
    }
    this.service.addListService(val).subscribe(res => {
      console.log(JSON.stringify(res).toString());
      alert(JSON.stringify(res).toString());
    })
  }

  updateListService() {
    var val = {
      guidListSevicesId: this.guidListSevicesId,
      description: this.description,
      servicesId: this.servicesId,
    }
    this.service.updateListService(val).subscribe(res => {
      console.log(JSON.stringify(res).toString());
      alert(JSON.stringify(res).toString());
    })
  }
}
