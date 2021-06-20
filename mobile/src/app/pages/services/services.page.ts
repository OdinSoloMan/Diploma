import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Services, ServicesService } from '../service/services.service';
import { DeteailService } from '../service/deteail.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

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
    private translate: TranslateService,
    private router: Router,
    private deteail: DeteailService,
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
    this.router.navigateByUrl("/apply-service");
    this.detail.setDetailSerivceInsert({
      listId: ans.GuidListSevicesId,
      description : ans.Description
    })
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
