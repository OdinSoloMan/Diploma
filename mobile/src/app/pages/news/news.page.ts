import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { News, NewsService } from '../service/news.service';
import languageDesign from '../../pages/jsonfile/language-design.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  language = localStorage.getItem("radioLanguage");
  textForm: any;
  news: News[];

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private service: NewsService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.checkLanguage();
    const loading = await this.loadingCtrl.create({ message: this.textForm.messageLoading });
    await loading.present();

    this.service.getAll().subscribe(
      async response => {
        this.news = response;
        console.log(response);
        loading.dismiss();
      },
      async (error) => {
        if (error.status == 401) {
          const alert = await this.alertCtrl.create({ message: this.textForm.messageLoadingErr, buttons: ['OK'] });
          await alert.present();
          loading.dismiss();
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          this.router.navigateByUrl("login")
        }
      }
    )
  }

  checkLanguage() {
    if (this.language == "ru") {
      this.textForm = languageDesign.ru.newsForm;
    }
    if (this.language == "eng") {
      this.textForm = languageDesign.eng.newsForm;
    }
  }
}
