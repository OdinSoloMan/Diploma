import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import languageDesign from '../../pages/jsonfile/language-design.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  language = localStorage.getItem("radioLanguage");
  textForm: any;
  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
  ) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  ngOnInit() {
    this.checkLanguage();
  }

  checkLanguage() {
    if (this.language == "ru") {
      this.textForm = languageDesign.ru.loginForm;
    }
    if (this.language == "eng") {
      this.textForm = languageDesign.eng.loginForm;
    }
  }

  async onSubmit() {
    //console.log(this.infoList);
    const loading = await this.loadingCtrl.create({ message: 'Logging in ...' });
    await loading.present();

    this.authService.login(this.form.value).subscribe(
      async response => {
        localStorage.setItem('token', response["token"]);
        localStorage.setItem('user_id', response["guid"])
        loading.dismiss();
        this.router.navigateByUrl('/news');
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: "Login Failed", buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
      }
    )
  }
}
