import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-suggestnewsorevent',
  templateUrl: './suggestnewsorevent.page.html',
  styleUrls: ['./suggestnewsorevent.page.scss'],
})
export class SuggestnewsoreventPage implements OnInit {
  public segment: string = "list1";
  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private detailURL: ApiService,
  ) { }

  url = this.detailURL.getURL() + '/news';
  url1 = this.detailURL.getURL() + '/events';

  ngOnInit() { }

  form = new FormGroup({
    newTitle: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(70)]),
    dataNew: new FormControl('', [Validators.required]),
    newDescription: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]),
  })

  form1 = new FormGroup({
    eventTitle: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(70)]),
    plannedStartDate: new FormControl('', [Validators.required]),
    descriptionOfTheEvent: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]),
  })

  async onSubmit() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    let postData = {
      newTitle: this.form.controls["newTitle"].value,
      dataNew: this.form.controls["dataNew"].value,
      newDescription: this.form.controls["newDescription"].value,
      usersId: localStorage.getItem("user_id")
    }
    console.log("postDataNews", postData);
    console.log("news", this.form.value);

    const loading = await this.loadingCtrl.create({ message: 'Request in progress ...' });
    await loading.present();

    this.http.post(this.url + "/addnews", postData, { headers }).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({ message: 'News offered', duration: 2000, color: 'dark' })
        await toast.present();
        loading.dismiss();
        this.form.reset();
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: 'This is an error ...', buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      }
    )
  }

  async onSubmit1() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    let postData = {
      eventTitle: this.form1.controls["eventTitle"].value,
      plannedStartDate: this.form1.controls["plannedStartDate"].value,
      descriptionOfTheEvent: this.form1.controls["descriptionOfTheEvent"].value,
      usersId: localStorage.getItem("user_id")
    }
    console.log("postDataEvent", postData);
    console.log("event", this.form1.value);

    const loading = await this.loadingCtrl.create({ message: 'Request in progress ...' });
    await loading.present();

    this.http.post(this.url1 + "/addevents", postData, { headers }).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({ message: 'Event offered', duration: 2000, color: 'dark' })
        await toast.present();
        loading.dismiss();
        this.form1.reset();
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: 'This is an error ...', buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      }
    )
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
