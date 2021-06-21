import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { DeteailService } from '../service/deteail.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ApiService, Services } from '../service/api.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  services: Services[];
  userAnswer: any;
  isNullInfo = true;

  servicesInformation: any[];
  automaticClose = false;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private api: ApiService,
    private detail: DeteailService,
    private translate: TranslateService,
    private router: Router,
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({ message: this.translate.instant("SERVICESFORM.messageLoading") });
    await loading.present();
    this.api.getAllServices().subscribe(
      async response => {
        this.servicesInformation = response;
        console.log(response);
        loading.dismiss();
        if (this.servicesInformation.length === 0) {
          this.isNullInfo = false;
        }
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
      description: ans.Description
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
