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

  servicesInformation: any[];
  automaticClose = false;

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private service: ServicesService,
    private http: HttpClient,
  ) { 
    this.service.getAll().subscribe(res => {
      this.servicesInformation = res;
      console.log(this.servicesInformation);
      //this.servicesInformation[0].open = true;
    })
  }

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
            console.log(postData);
            console.log('Confirm Ok');
          }
        }
      ]
    }).then(res => res.present())
  }

  toggleSection(index){
      console.log(index)
      this.servicesInformation[index].open  = !this.servicesInformation[index].open;

      if(this.automaticClose && this.servicesInformation[index].open){
        this.servicesInformation
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => item.open = false)
      }
  }

  toggleItem(index, childIndex){
    this.servicesInformation[index].children[childIndex].open != this.servicesInformation[index].children[childIndex].open
  }
}
