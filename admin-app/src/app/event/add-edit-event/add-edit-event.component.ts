import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';
import NotImage from '../../image/notimage.json';
@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.css']
})
export class AddEditEventComponent implements OnInit {
  base64textString: any;
  constructor(
    private service: SharedService,
    private toastr: ToastrService,
  ) { }

  @Input() event: any;
  guidEventsId: string;

  form = new FormGroup({
    eventTitle: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(70)]),
    descriptionOfTheEvent: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]),
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
    if (this.event.imageEvents)
      this.form.controls['imageEvents'].setValue(this.event.imageEvents);
    else
      this.form.controls['imageEvents'].setValue(NotImage.img);
    this.form.controls['isConsidered'].setValue(this.event.isConsidered);
    this.form.controls['usersId'].setValue(this.event.usersId);
  }

  addEvent() {
    var val = {
      eventTitle: this.form.value.eventTitle,
      descriptionOfTheEvent: this.form.value.descriptionOfTheEvent,
      plannedStartDate: this.form.value.plannedStartDate,
      imageEvents: this.form.value.imageEvents,
      usersId: this.form.value.usersId,
      isConsidered: JSON.parse(this.form.value.isConsidered),
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
    var val = {
      guidEventsId: this.guidEventsId,
      eventTitle: this.form.value.eventTitle,
      descriptionOfTheEvent: this.form.value.descriptionOfTheEvent,
      plannedStartDate: this.form.value.plannedStartDate,
      imageEvents: this.form.value.imageEvents,
      usersId: this.form.value.usersId,
      isConsidered: JSON.parse(this.form.value.isConsidered),
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

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);    
    this.compressImage('data:image/png;base64,' + btoa(binaryString), 640, 320).then(compressed => {
      console.log(compressed);
      this.form.controls['imageEvents'].setValue(compressed)
    })
  }

  compressImage(src, newX, newY) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, newX, newY);
        const data = ctx.canvas.toDataURL();
        res(data);
      }
      img.onerror = error => rej(error);
    })
  }  
}
