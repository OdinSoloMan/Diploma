import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Services, ServicesService } from '../service/services.service';
import { DeteailService } from '../service/deteail.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  services: Services[];
  userAnswer: any;

  servicesInformation: any[];
  automaticClose = false;

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private service: ServicesService,
    private http: HttpClient,
    private detail: DeteailService,
    private translate: TranslateService
  ) {
    this.service.getAll().subscribe(res => {
      this.servicesInformation = res;
      console.log(this.servicesInformation);
      //this.servicesInformation[0].open = true;
    })
  }
  url = this.detail.getURL() + '/consultationRequests';

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({ message: this.translate.instant("SERVICESFORM.messageLoading") });
    await loading.present();
    this.service.getAll().subscribe(
      async response => {
        this.services = response;
        console.log(response);
        loading.dismiss();
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: this.translate.instant("SERVICESFORM.messageLoadingErr"), buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
      }
    )
  }

  async onCreateRequst(ans) {
    this.userAnswer = ans;
    console.log(ans);

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant("SERVICESFORM.alertConsultationHeader") + ans.Description,
      inputs: [
        {
          name: 'reverseCommunication',
          type: 'text',
          placeholder: this.translate.instant("SERVICESFORM.alertConsultationContactPlaceholder")
        },
        {
          name: 'description',
          type: 'textarea',
          cssClass: 'minAlertMessage',
          placeholder: this.translate.instant("SERVICESFORM.alertConsultationDescriptionPlaceholder")
        },
      ],
      buttons: [
        {
          text: this.translate.instant("SERVICESFORM.alertConsultationBtnCancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log("gg")
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async (res) => {
            let postData = {
              "ListServicesId": ans.GuidListSevicesId,
              "Description": res.description,
              "ReverseCommunication": res.reverseCommunication,
              "UsersId": localStorage.getItem("user_id")
            }
            const token = localStorage.getItem('token');
            const headers = new HttpHeaders({
              Authorization: 'Bearer ' + token
            });
            const loading = await this.loadingCtrl.create({ message: this.translate.instant("SERVICESFORM.messageLoadingSending") });
            await loading.present();
            this.http.post(this.url + "/addconsultationRequests", postData, { headers }).subscribe(
              async () => {
                const toast = await this.toastCtrl.create({ message: this.translate.instant("SERVICESFORM.messageLoadingSendingTrue"), duration: 2000, color: 'dark' })
                await toast.present();
                loading.dismiss();
              },
              async () => {
                const alert = await this.alertCtrl.create({ message: this.translate.instant("SERVICESFORM.messageLoadingSendingErr"), buttons: ['OK'] });
                loading.dismiss();
                await alert.present();
              }
            )
            console.log(postData);
            console.log('Confirm Ok');
          }
        }
      ]
    }).then(res => res.present())
  }

  toggleSection(index) {
    console.log(index)
    this.servicesInformation[index].open = !this.servicesInformation[index].open;

    if (this.automaticClose && this.servicesInformation[index].open) {
      this.servicesInformation
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => item.open = false)
    }
  }

  toggleItem(index, childIndex) {
    this.servicesInformation[index].children[childIndex].open != this.servicesInformation[index].children[childIndex].open
  }
}
