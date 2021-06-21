import { TranslateService } from '@ngx-translate/core'
import { Injectable } from '@angular/core';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = '';

  constructor(
    private translate: TranslateService,
  ) { }

  setInitialAppLanguage(val) {
    //this.storage.create()
    //let language = this.translate.getBrowserCultureLang() === "ru-RU" ? "ru": "en"
    //this.translate.setDefaultLang(language);
    console.log("fff", val)
    if (val === "ru") {

      this.translate.setDefaultLang("ru")
      this.selected = "ru";
      this.setLanguage("ru");
    } else {

      this.translate.setDefaultLang("en")
      this.selected = "en";
      this.setLanguage("en");
    }

    // this.storage.get(LNG_KEY).then(val => {
    //   if (val) {
    //     this.setLanguage(val);
    //     this.selected = val;
    //   }
    // })
  }

  getLanguages() {
    return [
      { text: 'English', value: 'en' },
      { text: 'Russian', value: 'ru' },
    ]
  }

  setLanguage(lng) {
    console.log(lng)
    this.translate.use(lng);
    this.selected = lng;
  }
}
