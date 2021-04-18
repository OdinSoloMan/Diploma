import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { User, UsersinfoService } from '../service/usersinfo.service';

@Component({
  selector: 'app-infousers',
  templateUrl: './infousers.page.html',
  styleUrls: ['./infousers.page.scss'],
})
export class InfousersPage implements OnInit {
  private url = 'https://localhost:44367/users';
  public segment: string = "list1";
  infousers: User[] = [];

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private service: UsersinfoService
  ) { }

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(5)]),
    position: new FormControl('', [Validators.required, Validators.minLength(5)]),
    typeOfEnterprise: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  form1 = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)])
  }, { validators: this.checkPasswords })

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : { notSame: true }
  }

  async onSubmit() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    let postData = {
      fullName: this.form.controls["fullName"].value,
      email: this.form.controls["email"].value,
      telephone: this.form.controls["telephone"].value,
      position: this.form.controls["position"].value,
      typeOfEnterprise: this.form.controls["typeOfEnterprise"].value,
      guidUsersId: localStorage.getItem("user_id")
    }
    console.log("postDataNews", postData);
    console.log("form", this.form.value);

    const loading = await this.loadingCtrl.create({ message: 'Request in progress ...' });
    await loading.present();

    this.http.put(this.url + "/updateusers", postData, { headers }).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({ message: 'Updata info оn users', duration: 2000, color: 'dark' })
        await toast.present();
        loading.dismiss();
        // this.form.reset();
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: 'This is an error ...', buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      }
    )
  }

  async onSubmit1() {
    console.log(this.form1.value);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    let postData = {
      password: this.form1.controls["password"].value,
      guidUsersId: localStorage.getItem("user_id")
    }
    console.log("postDataNews", postData);
    console.log("form", this.form1.value);

    const loading = await this.loadingCtrl.create({ message: 'Request in progress ...' });
    await loading.present();

    this.http.put(this.url + "/updateusers", postData, { headers }).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({ message: 'Updata info оn users', duration: 2000, color: 'dark' })
        await toast.present();
        loading.dismiss();
        // this.form.reset();
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: 'This is an error ...', buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      }
    )
  }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({ message: 'Loading in events...' });
    await loading.present();

    this.service.readUserId().subscribe(
      async response => {
        this.infousers = [response];
        this.form.setValue({
          fullName: this.infousers[0].fullName,
          email: this.infousers[0].email,
          telephone: this.infousers[0].telephone,
          position: this.infousers[0].position,
          typeOfEnterprise: this.infousers[0].typeOfEnterprise,
        });
        console.log(this.infousers[0].guidUsersId);
        console.log([response][0].guidUsersId);
        loading.dismiss();
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: "Loading Failed", buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
      }
    )
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
