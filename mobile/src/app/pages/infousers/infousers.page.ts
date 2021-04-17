import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { User, UsersinfoService } from '../service/usersinfo.service';

@Component({
  selector: 'app-infousers',
  templateUrl: './infousers.page.html',
  styleUrls: ['./infousers.page.scss'],
})
export class InfousersPage implements OnInit {
  infousers: User[]=[];
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private service: UsersinfoService
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({ message: 'Loading in events...' });
    await loading.present();

    this.service.readUserId().subscribe(
      async response => {
        this.infousers = [response];
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


}
