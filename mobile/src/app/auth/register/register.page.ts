import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import languageDesign from '../../pages/jsonfile/language-design.json'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  language = localStorage.getItem("radioLanguage");
  textForm: any;

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router,
  ) { }

  ngOnInit(){
    this.checkLanguage();
  }

  checkLanguage() {
    if(this.language == "ru"){
      this.textForm = languageDesign.ru.registrationForm;
    }
    if(this.language == "eng"){
      this.textForm = languageDesign.eng.registrationForm;
    }
  }

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(5)]),
    position: new FormControl('', [Validators.required, Validators.minLength(5)]),
    typeOfEnterprise: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  async onSubmit() {
    const loading = await this.loadingCtrl.create({ message: 'Registering ...' });
    await loading.present();
    this.authService.register(this.form.value).subscribe(
      async () => {
        // если успешно
        const toast = await this.toastCtrl.create({message : 'User Created', duration: 2000, color: 'dark'})
        await toast.present();
        loading.dismiss();
        this.form.reset();
        this.router.navigateByUrl('/login');
      },
      // если ошибка
      async () => {
        const alert = await this.alertCtrl.create({ message: 'This is an error ...', buttons:['OK'] });
        loading.dismiss();
        await alert.present();
      }
    )
  }
}
