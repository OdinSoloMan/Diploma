import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Services, ServicesService } from '../service/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  services: Services[];
  userAnswer: any;
  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private service: ServicesService,
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
      header: 'Sign up for a consultation ' +  ans.Description,
      inputs: [
        {          
          name: 'howToContact',
          type: 'text',
          placeholder: 'howToContact'
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
          handler: (res) => {
            console.log([{"guid": ans.GuidListSevicesId, 
            "descr": res.description, 
            "usID": localStorage.getItem("user_id")}]);
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
