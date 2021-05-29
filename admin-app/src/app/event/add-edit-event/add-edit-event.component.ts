import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.css']
})
export class AddEditEventComponent implements OnInit {

  constructor(
    private service: SharedService,
    private toastr: ToastrService,
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

    const http$ = this.service.addEvent(val);
    http$.subscribe(
      res => {
        console.log('HTTP response', res)
        this.toastr.success('Success', '200', {
          timeOut: 500,
          closeButton: true
        });
      }, err => {
        console.log('HTTP Error', err)
        this.toastr.error('Eror', err.status, {
          timeOut: 500,
          closeButton: true
        });
      }, () => console.log('HTTP request completed.')
    );
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

    const http$ = this.service.updateEvent(val);
    http$.subscribe(
      res => {
        console.log('HTTP response', res)
        this.toastr.success('Success', '200', {
          timeOut: 500,
          closeButton: true
        });
      }, err => {
        console.log('HTTP Error', err)
        this.toastr.error('Eror', err.status, {
          timeOut: 500,
          closeButton: true
        });
      }, () => console.log('HTTP request completed.')
    );
  }
}
