import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { News, NewsService } from '../service/news.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  news: News[];

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private service: NewsService,
    private router: Router,
    private tranlate: TranslateService,
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({ message: this.tranlate.instant("NEWSFORM.messageLoading") });
    await loading.present();

    this.service.getAll().subscribe(
      async response => {
        this.news = response;
        console.log(response);
        loading.dismiss();
      },
      async (error) => {
        if (error.status == 401) {
          const alert = await this.alertCtrl.create({ message: this.tranlate.instant("NEWSFORM.messageLoadingErr"), buttons: ['OK'] });
          await alert.present();
          loading.dismiss();
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          this.router.navigateByUrl("login")
        }
      }
    )
  }
}
