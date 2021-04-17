import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { News, NewsService } from '../service/news.service';

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
    private service : NewsService,
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({message: 'Loading in news...'});
    await loading.present();

    this.service.getAll().subscribe(
      async response => {
        this.news = response;
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
