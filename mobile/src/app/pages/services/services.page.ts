import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Services, ServicesService } from '../service/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  private url = 'https://localhost:44367/consultationRequests';
  services: Services[];
  userAnswer: any;
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private service: ServicesService,
    private http: HttpClient,
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({ message: 'Loading in services...' });
    await loading.present();
    this.service.getAll().subscribe(
      async response => {
        this.services = response;
        console.log(response);
        loading.dismiss();
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: "Loading Failed", buttons: ['OK'] });
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
      header: 'Sign up for a consultation ' + ans.Description,
      inputs: [
        {
          name: 'reverseCommunication',
          type: 'text',
          placeholder: 'HowToContact'
        },
        {
          name: 'description',
          type: 'textarea',
          cssClass: 'minAlertMessage',
          placeholder: 'Description'
        },
        // multiline input.
        // {
        //   name: 'paragraph',
        //   id: 'paragraph',
        //   type: 'textarea',
        //   placeholder: 'Placeholder 3'
        // },
        // {
        //   name: 'name3',
        //   value: 'http://ionicframework.com',
        //   type: 'url',
        //   placeholder: 'Favorite site ever'
        // },
        // // input date with min & max
        // {
        //   name: 'name4',
        //   type: 'date',
        //   min: '2017-03-01',
        //   max: '2018-01-12'
        // },
        // // input date without min nor max
        // {
        //   name: 'name5',
        //   type: 'date'
        // },
        // {
        //   name: 'name6',
        //   type: 'number',
        //   min: -5,
        //   max: 10
        // },
        // {
        //   name: 'name7',
        //   type: 'number'
        // },
        // {
        //   name: 'name8',
        //   type: 'password',
        //   placeholder: 'Advanced Attributes',
        //   cssClass: 'specialClass',
        //   attributes: {
        //     maxlength: 4,
        //     inputmode: 'decimal'
        //   }
        // }
      ],
      buttons: [
        {
          text: 'Cancel',
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
            const loading = await this.loadingCtrl.create({ message: 'Request in progress ...' });
            await loading.present();
            this.http.post(this.url + "/addconsultationRequests", postData, { headers }).subscribe(
              async () => {
                const toast = await this.toastCtrl.create({ message: 'Application sent', duration: 2000, color: 'dark' })
                await toast.present();
                loading.dismiss();
              },
              async () => {
                const alert = await this.alertCtrl.create({ message: 'This is an error ...', buttons: ['OK'] });
                loading.dismiss();
                await alert.present();
              }
            )
            console.log([{
              "guid": ans.GuidListSevicesId,
              "descr": res.description,
              "usID": localStorage.getItem("user_id")
            }]);

            console.log('Confirm Ok');
          }
        }
      ]
    }).then(res => res.present())

    // await alert.present();
    // let result = await alert.onDidDismiss();
    // console.log(result);
  }
}
