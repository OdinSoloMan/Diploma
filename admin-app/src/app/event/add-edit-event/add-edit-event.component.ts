import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.css']
})
export class AddEditEventComponent implements OnInit {

  constructor(
    private service: SharedService,
  ) { }

  @Input() event: any;
  guidEventsId: string;
  eventTitle: string;
  descriptionOfTheEvent: string;
  plannedStartDate: string;
  imageEvents: string;
  isConsidered: string;
  usersId: string;
  ngOnInit(): void {
    this.guidEventsId = this.event.guidEventsId;
    this.eventTitle = this.event.eventTitle;
    this.descriptionOfTheEvent = this.event.descriptionOfTheEvent;
    this.plannedStartDate = this.event.plannedStartDate;
    this.imageEvents = this.event.imageEvents;
    this.isConsidered = this.event.isConsidered;
    this.usersId = this.event.usersId;
  }
  s: any = false;
  addEvent() {
    this.s = false;
    if(this.isConsidered == "true"){
      this.s = true;
    } 
    var val = {
      eventTitle : this.eventTitle,
      descriptionOfTheEvent : this.descriptionOfTheEvent,
      plannedStartDate : this.plannedStartDate,
      imageEvents : this.imageEvents,
      isConsidered : this.s,
      usersId : this.usersId,
    }
    this.service.addEvent(val).subscribe(res => {
      console.log(JSON.stringify(res).toString());
      alert(JSON.stringify(res).toString());
    })
  }

  updateEvent() {
    this.s = false;
    if(this.isConsidered == "true"){
      this.s = true;
    } 
    var val = {
      guidEventsId : this.guidEventsId,
      eventTitle : this.eventTitle,
      descriptionOfTheEvent : this.descriptionOfTheEvent,
      plannedStartDate : this.plannedStartDate,
      imageEvents : this.imageEvents,
      isConsidered : this.s,
      usersId : this.usersId,
    }
    this.service.updateEvent(val).subscribe(res => {
      console.log(JSON.stringify(res).toString());
      alert(JSON.stringify(res).toString());
    })
  }
}
