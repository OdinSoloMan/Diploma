import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';
import NotImage from '../../image/notimage.json';

@Component({
  selector: 'app-add-edit-news',
  templateUrl: './add-edit-news.component.html',
  styleUrls: ['./add-edit-news.component.css']
})
export class AddEditNewsComponent implements OnInit {
  base64textString: any;
  constructor(
    private service: SharedService,
    private toastr: ToastrService,
  ) { }

  @Input() news: any;
  guidNewsId: string;

  form = new FormGroup({
    newTitle: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(70)]),
    newDescription: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]),
    dataNew: new FormControl('', [Validators.required]),
    imageNew: new FormControl('', [Validators.required]),
    isConsidered: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(5), Validators.pattern('(true|false)?')]),
    usersId: new FormControl('', [Validators.required, Validators.minLength(36), Validators.maxLength(36), Validators.pattern('[\\da-zA-Z]{8}-([\\da-zA-Z]{4}-){3}[\\da-zA-Z]{12}')]),
  })

  ngOnInit(): void {
    this.guidNewsId = this.news.guidNewsId;
    this.form.controls['newTitle'].setValue(this.news.newTitle);
    this.form.controls['newDescription'].setValue(this.news.newDescription);
    this.form.controls['dataNew'].setValue(this.news.dataNew);
    if (this.news.imageNew)
      this.form.controls['imageNew'].setValue(this.news.imageNew);
    else
      this.form.controls['imageNew'].setValue(NotImage.img);
    this.form.controls['isConsidered'].setValue(this.news.isConsidered);
    if (this.news.guidNewsId !== 0)
      this.form.controls['usersId'].setValue(this.news.usersId);
    else
      this.form.controls['usersId'].setValue(localStorage.getItem("user_id"));
  }

  addNews() {
    var val = {
      newTitle: this.form.value.newTitle,
      newDescription: this.form.value.newDescription,
      dataNew: this.form.value.dataNew,
      imageNew: this.form.value.imageNew,
      usersId: this.form.value.usersId,
      isConsidered: JSON.parse(this.form.value.isConsidered),
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
    var val = {
      guidNewsId: this.guidNewsId,
      newTitle: this.form.value.newTitle,
      newDescription: this.form.value.newDescription,
      dataNew: this.form.value.dataNew,
      imageNew: this.form.value.imageNew,
      usersId: this.form.value.usersId,
      isConsidered: JSON.parse(this.form.value.isConsidered),
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
      this.form.controls['imageNew'].setValue(compressed)
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
