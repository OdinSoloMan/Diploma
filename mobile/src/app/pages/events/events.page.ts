import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Event, EventService } from '../service/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  textForm: any;
  events: Event[];

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private service: EventService,
    private translate: TranslateService,
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({ message: this.translate.instant("EVENTSFORM.messageLoading") });
    await loading.present();

    this.service.getAll().subscribe(
      async response => {
        this.events = response;
        console.log(response);
        loading.dismiss();
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: this.translate.instant("EVENTSFORM.messageLoadingErr"), buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
      }
    )
  }
}
