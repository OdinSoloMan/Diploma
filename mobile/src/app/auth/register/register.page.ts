import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router,
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
    const loading = await this.loadingCtrl.create({ message: 'Registering ...' });
    await loading.present();
    this.authService.register(this.form.value).subscribe(
      async () => {
        // если успешно
        const toast = await this.toastCtrl.create({ message: 'User Created', duration: 2000, color: 'dark' })
        await toast.present();
        loading.dismiss();
        this.form.reset();
        this.router.navigateByUrl('/login');
      },
      // если ошибка
      async () => {
        const alert = await this.alertCtrl.create({ message: 'This is an error ...', buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      }
    )
  }
}
