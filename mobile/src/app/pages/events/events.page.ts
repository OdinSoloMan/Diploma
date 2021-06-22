import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { timeout } from 'rxjs/operators';
import { ApiService, Event } from '../service/api.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  textForm: any;
  events: Event[]
  isNullInfo = true;
  infoTextError = "";
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private api: ApiService,
    private translate: TranslateService,
    private router: Router,
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({ message: this.translate.instant("EVENTSFORM.messageLoading") });
    await loading.present();

    this.api.getAllEvents()
    .pipe(timeout(60000))
    .subscribe(
      async response => {
        this.events = response;
        console.log(response);
        loading.dismiss();
        if (this.events.length === 0) {
          this.isNullInfo = false;
          this.infoTextError = this.translate.instant("INFO.notFound")
        }
        else {
          this.isNullInfo = true;
          this.infoTextError = "";
        }
      },
      async (error) => {
        const alert = await this.alertCtrl.create({ message: this.translate.instant("EVENTSFORM.messageLoadingErr"), buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
        this.isNullInfo = false;
        this.infoTextError = this.translate.instant("INFO.notFound")

        if (error.status == 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          this.router.navigateByUrl("login");
          this.infoTextError = "";
        } else {
          this.isNullInfo = false;
          this.infoTextError = this.translate.instant("INFO.errorRefresh")
        }
        console.log('error', error)
      }
    )
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit()
    event.target.complete();
  }
}
