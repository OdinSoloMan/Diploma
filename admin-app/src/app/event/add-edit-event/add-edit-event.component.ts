import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  form = new FormGroup({
    eventTitle: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern('[a-zA-ZА-Яа-я_ ]*')]),
    descriptionOfTheEvent: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(150)]),
    plannedStartDate: new FormControl('', [Validators.required]),
    imageEvents: new FormControl('', [Validators.required]),
    isConsidered: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(5), Validators.pattern('[a-zA-Z]*')]),
    usersId: new FormControl('', [Validators.required, Validators.minLength(36), Validators.maxLength(36), Validators.pattern('[\\da-zA-Z]{8}-([\\da-zA-Z]{4}-){3}[\\da-zA-Z]{12}')]),
  })

  ngOnInit(): void {
    this.guidEventsId = this.event.guidEventsId;
    this.form.controls['eventTitle'].setValue(this.event.eventTitle);
    this.form.controls['descriptionOfTheEvent'].setValue(this.event.descriptionOfTheEvent);
    this.form.controls['plannedStartDate'].setValue(this.event.plannedStartDate);
    this.form.controls['imageEvents'].setValue(this.event.imageEvents);
    this.form.controls['isConsidered'].setValue(this.event.isConsidered);
    this.form.controls['usersId'].setValue(this.event.usersId);
  }

  s: any = false;
  addEvent() {
    this.s = false;
    if(this.form.value.isConsidered == "true"){
      this.s = true;
    } 
    var val = {
      eventTitle : this.form.value.eventTitle,
      descriptionOfTheEvent : this.form.value.descriptionOfTheEvent,
      plannedStartDate : this.form.value.plannedStartDate,
      imageEvents : this.form.value.imageEvents,      
      usersId : this.form.value.usersId,
      isConsidered : this.s,
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
    if(this.form.value.isConsidered == "true"){
      this.s = true;
    } 
    var val = {
      guidEventsId : this.guidEventsId,
      eventTitle : this.form.value.eventTitle,
      descriptionOfTheEvent : this.form.value.descriptionOfTheEvent,
      plannedStartDate : this.form.value.plannedStartDate,
      imageEvents : this.form.value.imageEvents,      
      usersId : this.form.value.usersId,
      isConsidered : this.s,
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
