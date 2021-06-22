import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { timeout } from 'rxjs/operators';
import { ApiService, News } from '../service/api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  news: News[];
  refresh = true;
  isNullInfo = true;
  infoTextError = "";
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private api: ApiService,
    private router: Router,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(() => {
      this.initData();
    });
  }

  async initData() {
    if (this.refresh) {
      this.refresh = false;
      const loading = await this.loadingCtrl.create({ message: this.translate.instant("NEWSFORM.messageLoading") });
      await loading.present();

      this.api.getAllNews()
        .pipe(timeout(60000))
        .subscribe(
          async response => {
            this.news = response;
            console.log(response);
            console.log(response.length)
            loading.dismiss();
            if (this.news.length === 0) {
              this.isNullInfo = false;
              this.infoTextError = this.translate.instant("INFO.notFound")
            } else {
              this.isNullInfo = true;
              this.infoTextError = "";
            }
          },
          async (error) => {
            const alert = await this.alertCtrl.create({ message: this.translate.instant("NEWSFORM.messageLoadingErr"), buttons: ['OK'] });
            await alert.present();
            loading.dismiss();
            this.isNullInfo = false;
            this.infoTextError = this.translate.instant("INFO.notFound")

            if (error.status == 401) {
              localStorage.removeItem("token");
              localStorage.removeItem("user_id");
              this.router.navigateByUrl("login");
              this.refresh = true;
              this.infoTextError = "";
            } else {
              this.isNullInfo = false;
              this.infoTextError = this.translate.instant("INFO.errorRefresh")
            }
            console.log('error', error)
          }
        )
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.refresh = true;
    this.initData()
    event.target.complete();
  }
}
