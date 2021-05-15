import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Event, EventService } from '../service/event.service';
import languageDesign from '../../pages/jsonfile/language-design.json';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  language = localStorage.getItem("radioLanguage");
  textForm: any;
  events: Event[];

  constructor( 
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private service: EventService,
  ) { }

  async ngOnInit(){
    this.checkLanguage();
    const loading = await this.loadingCtrl.create({message: this.textForm.messageLoading});
    await loading.present();

    this.service.getAll().subscribe(
      async response => {
      this.events = response;
      console.log(response);
      loading.dismiss();
    },
      async () => {
        const alert = await this.alertCtrl.create({message : this.textForm.messageLoadingErr, buttons: ['OK']});
        await alert.present();
        loading.dismiss();
      }
    )
  }

  checkLanguage() {
    if (this.language == "ru") {
      this.textForm = languageDesign.ru.eventsForm;
    }
    if (this.language == "eng") {
      this.textForm = languageDesign.eng.eventsForm;
    }
  }
}
