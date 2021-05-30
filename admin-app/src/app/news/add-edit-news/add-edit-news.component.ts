import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-news',
  templateUrl: './add-edit-news.component.html',
  styleUrls: ['./add-edit-news.component.css']
})
export class AddEditNewsComponent implements OnInit {

  constructor(
    private service: SharedService,
    private toastr: ToastrService,
  ) { }

  @Input() news: any;
  guidNewsId: string;

  form = new FormGroup({
    newTitle: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern('[a-zA-ZА-Яа-я_ ]*')]),
    newDescription: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(150)]),
    dataNew: new FormControl('', [Validators.required]),
    imageNew: new FormControl('', [Validators.required]),
    isConsidered: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(5), Validators.pattern('[a-zA-Z]*')]),
    usersId: new FormControl('', [Validators.required, Validators.minLength(36), Validators.maxLength(36), Validators.pattern('[\\da-zA-Z]{8}-([\\da-zA-Z]{4}-){3}[\\da-zA-Z]{12}')]),
  })

  ngOnInit(): void {
    this.guidNewsId = this.news.guidNewsId;
    this.form.controls['newTitle'].setValue(this.news.newTitle);
    this.form.controls['newDescription'].setValue(this.news.newDescription);
    this.form.controls['dataNew'].setValue(this.news.dataNew);
    this.form.controls['imageNew'].setValue(this.news.imageNew);
    this.form.controls['isConsidered'].setValue(this.news.isConsidered);
    this.form.controls['usersId'].setValue(this.news.usersId);
  }
  
  s: any = false;
  addNews() {
    this.s = false;
    if(this.form.value.isConsidered == "true"){
      this.s = true;
    } 
    var val = {
      newTitle : this.form.value.newTitle,
      newDescription : this.form.value.newDescription,
      dataNew : this.form.value.dataNew,
      imageNew : this.form.value.imageNew,
      usersId : this.form.value.usersId,
      isConsidered : this.s,
    }

    const http$ = this.service.addNews(val);
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

  updateNews() {
    this.s = false;
    if(this.form.value.isConsidered  == "true"){
      this.s = true;
    } 
    var val = {
      guidNewsId : this.guidNewsId,
      newTitle : this.form.value.newTitle,
      newDescription : this.form.value.newDescription,
      dataNew : this.form.value.dataNew,
      imageNew : this.form.value.imageNew,
      usersId : this.form.value.usersId,
      isConsidered : this.s,
    }

    const http$ = this.service.updateNews(val);
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
