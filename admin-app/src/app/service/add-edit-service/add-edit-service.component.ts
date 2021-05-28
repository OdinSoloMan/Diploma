import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-service',
  templateUrl: './add-edit-service.component.html',
  styleUrls: ['./add-edit-service.component.css']
})
export class AddEditServiceComponent implements OnInit {

  constructor(
    private serv: SharedService
  ) { }

  @Input() service: any;
  guidServicesId: string;
  name: string;
  ngOnInit(): void {
    this.guidServicesId = this.service.guidServicesId;
    this.name = this.service.name;
  }

  addService() {
    var val = {
      name: this.name,
    }
    this.serv.addService(val).subscribe(res => {
      console.log(JSON.stringify(res).toString());
      alert(JSON.stringify(res).toString());
    })
  }

  updateService(){
    var val = {
      guidServicesId: this.guidServicesId,
      name: this.name,
    }
    this.serv.updateService(val).subscribe(res => {
      console.log(JSON.stringify(res).toString());
      alert(JSON.stringify(res).toString());
    })
  }
}
