import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Event, EventService } from '../service/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  events: Event[];
  constructor( 
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private service: EventService,
  ) { }

  async ngOnInit(){
    const loading = await this.loadingCtrl.create({message: 'Loading in events...'});
    await loading.present();

    this.service.getAll().subscribe(
      async response => {
      this.events = response;
      console.log(response);
      loading.dismiss();
    },
      async () => {
        const alert = await this.alertCtrl.create({message : "Loading Failed", buttons: ['OK']});
        await alert.present();
        loading.dismiss();
      }
    )
  }
}
