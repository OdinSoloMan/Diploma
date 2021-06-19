import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  messageIsErrorCombo: any;
  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private tranlate: TranslateService,
  ) { }

  ngOnInit() { }

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern('[a-zA-ZА-Яа-я_ ]*')]),
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^(1|1\\s)?(\\d{11}|(\\d{3}\\-){2}\\d{4}|\\(\\d{3}\\)\\s?\\d{3}\\-\\d{4}|(\\d{3}\\s){2}\\d{4})$')]),
    position: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern('[a-zA-ZА-Яа-я]*')]),
    typeOfEnterprise: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern('[a-zA-ZА-Яа-я]*')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(45)]),
  })

  async onSubmit() {
    const loading = await this.loadingCtrl.create({ message: this.tranlate.instant("REGISTRATIONFORM.messageLoading") });
    await loading.present();
    this.authService.register(this.form.value).subscribe(
      async () => {
        // если успешно
        const toast = await this.toastCtrl.create({ message: this.tranlate.instant("REGISTRATIONFORM.messageCreateUsersTrue"), duration: 2000, color: 'dark' })
        await toast.present();
        loading.dismiss();
        this.form.reset();
        this.router.navigateByUrl('/login');
      },
      // если ошибка
      async (error) => {
        this.messageIsErrorCombo = this.tranlate.instant("REGISTRATIONFORM.messageLoadingErr");
        console.log(error);
        if (error.error.includes("email")) {
          this.messageIsErrorCombo += this.tranlate.instant("REGISTRATIONFORM.messageBusy.email") + this.tranlate.instant("REGISTRATIONFORM.messageBusy.busyE")
          console.log(this.messageIsErrorCombo)
        }
        if (error.error.includes("telephone")) {
          this.messageIsErrorCombo += this.tranlate.instant("REGISTRATIONFORM.messageBusy.telephone") + this.tranlate.instant("REGISTRATIONFORM.messageBusy.busyT")
        }
        const alert = await this.alertCtrl.create({ message: this.messageIsErrorCombo, buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      }
    )
  }
}
