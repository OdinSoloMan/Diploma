import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../service/api.service';
import { DeteailService } from '../service/deteail.service';

@Component({
  selector: 'app-apply-service',
  templateUrl: './apply-service.page.html',
  styleUrls: ['./apply-service.page.scss'],
})
export class ApplyServicePage implements OnInit {
  name: any;
  constructor(
    private detail: DeteailService,
    private detailURL : ApiService,
    private translate: TranslateService,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  form = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]),
    reverseCommunication: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern('([a-z0-9]+[_a-z0-9\\.-]*[a-z0-9]+@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})|([0-9]{11}))')]),
  })

  ngOnInit() {
    console.log(this.detail.getDetailSerivceInsert())
    this.name = this.detail.getDetailSerivceInsert().description
  }
  url = this.detailURL.getURL() + '/consultationRequests';
  async onSubmit() {
    //this.form.controls["newTitle"].value,
    let postData = {
      "ListServicesId": this.detail.getDetailSerivceInsert().listId,
      "Description": this.form.controls["description"].value,
      "ReverseCommunication": this.form.controls["reverseCommunication"].value,
      "UsersId": localStorage.getItem("user_id")
    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    const loading = await this.loadingCtrl.create({ message: this.translate.instant("APPLYSERVICE.messageLoadingSending") });
    await loading.present();
    this.http.post(this.url + "/addconsultationRequests", postData, { headers }).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({ message: this.translate.instant("APPLYSERVICE.messageLoadingSendingTrue"), duration: 2000, color: 'dark' })
        await toast.present();
        loading.dismiss();
        this.form.reset();
        this.router.navigateByUrl('/services')
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: this.translate.instant("APPLYSERVICE.messageLoadingSendingErr"), buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      }
    )
  }
  // this.userAnswer = ans;
  // console.log(ans);

  // const alert = await this.alertCtrl.create({
  //   cssClass: 'my-custom-class',
  //   header: this.translate.instant("SERVICESFORM.alertConsultationHeader") + ans.Description,
  //   inputs: [
  //     {
  //       name: 'reverseCommunication',
  //       type: 'text',
  //       placeholder: this.translate.instant("SERVICESFORM.alertConsultationContactPlaceholder")
  //     },
  //     {
  //       name: 'description',
  //       type: 'textarea',
  //       cssClass: 'minAlertMessage',
  //       placeholder: this.translate.instant("SERVICESFORM.alertConsultationDescriptionPlaceholder")
  //     },
  //   ],
  //   buttons: [
  //     {
  //       text: this.translate.instant("SERVICESFORM.alertConsultationBtnCancel"),
  //       role: 'cancel',
  //       cssClass: 'secondary',
  //       handler: () => {
  //         console.log("gg")
  //         console.log('Confirm Cancel');
  //       }
  //     }, {
  //       text: 'Ok',
  //       handler: async (res) => {
  //         let postData = {
  //           "ListServicesId": ans.GuidListSevicesId,
  //           "Description": res.description,
  //           "ReverseCommunication": res.reverseCommunication,
  //           "UsersId": localStorage.getItem("user_id")
  //         }
  //         const token = localStorage.getItem('token');
  //         const headers = new HttpHeaders({
  //           Authorization: 'Bearer ' + token
  //         });
  //         const loading = await this.loadingCtrl.create({ message: this.translate.instant("SERVICESFORM.messageLoadingSending") });
  //         await loading.present();
  //         this.http.post(this.url + "/addconsultationRequests", postData, { headers }).subscribe(
  //           async () => {
  //             const toast = await this.toastCtrl.create({ message: this.translate.instant("SERVICESFORM.messageLoadingSendingTrue"), duration: 2000, color: 'dark' })
  //             await toast.present();
  //             loading.dismiss();
  //           },
  //           async () => {
  //             const alert = await this.alertCtrl.create({ message: this.translate.instant("SERVICESFORM.messageLoadingSendingErr"), buttons: ['OK'] });
  //             loading.dismiss();
  //             await alert.present();
  //           }
  //         )
  //         console.log(postData);
  //         console.log('Confirm Ok');
  //       }
  //     }
  //   ]
  // }).then(res => res.present())
}
