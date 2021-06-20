import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { User, UsersinfoService } from '../service/usersinfo.service';
import { DeteailService } from '../service/deteail.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-infousers',
  templateUrl: './infousers.page.html',
  styleUrls: ['./infousers.page.scss'],
})
export class InfousersPage implements OnInit {
  messageIsErrorCombo: any;
  public segment: string = "list1";
  infousers: User[] = [];

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private service: UsersinfoService,
    private detail: DeteailService,
    private translate: TranslateService,
  ) { }
  url = this.detail.getURL() + '/users';

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern('[a-zA-ZА-Яа-я_ ]*')]),
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11),Validators.pattern('[0-9]{11}')]),
    position: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern('[a-zA-ZА-Яа-я]*')]),
    typeOfEnterprise: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern('[a-zA-ZА-Яа-я]*')]),
  })

  form1 = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(45)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(45)])
  }, { validators: this.checkPasswords })

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    if (password === confirmPassword) {
      return null
    } else {
      return { notSame: true }
    }
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

    const loading = await this.loadingCtrl.create({ message: this.translate.instant('INFOUSERFORM.UPDATEINFOUSER.messsageLoading') });
    await loading.present();

    this.http.put(this.url + "/updateusers", postData, { headers }).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({ message: this.translate.instant('INFOUSERFORM.UPDATEINFOUSER.messageUpdateDataTrue'), duration: 2000, color: 'dark' })
        await toast.present();
        loading.dismiss();
        // this.form.reset();
      },
      async (error) => {
        if (error.error.includes("email")) {
          this.messageIsErrorCombo = this.translate.instant("INFOUSERFORM.messageBusy.email") + this.translate.instant("INFOUSERFORM.messageBusy.busyE")
          console.log(this.messageIsErrorCombo)
        } else if (error.error.includes("telephone")) {
          this.messageIsErrorCombo = this.translate.instant("INFOUSERFORM.messageBusy.telephone") + this.translate.instant("INFOUSERFORM.messageBusy.busyT")
        }
        else {
          this.messageIsErrorCombo = this.translate.instant('INFOUSERFORM.UPDATEINFOUSER.messageUpdateDataErr')
        }
        const alert = await this.alertCtrl.create({ message: this.messageIsErrorCombo, buttons: ['OK'] });
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

    const loading = await this.loadingCtrl.create({ message: this.translate.instant('INFOUSERFORM.UPDATEPASSWORD.messsageLoading') });
    await loading.present();

    this.http.put(this.url + "/updateusers", postData, { headers }).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({ message: this.translate.instant('INFOUSERFORM.UPDATEPASSWORD.messageUpdateDataTrue'), duration: 2000, color: 'dark' })
        await toast.present();
        loading.dismiss();
        // this.form.reset();
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: this.translate.instant('INFOUSERFORM.UPDATEPASSWORD.messageUpdateDataErr'), buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      }
    )
  }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({ message: this.translate.instant('INFOUSERFORM.loadingingInfo') });
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
        const alert = await this.alertCtrl.create({ message: this.translate.instant('INFOUSERFORM.loadingingInfoErr'), buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
      }
    )
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
