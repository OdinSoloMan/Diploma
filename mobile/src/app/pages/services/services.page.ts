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

}
