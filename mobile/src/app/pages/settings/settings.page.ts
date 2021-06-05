import { Component, OnInit, Renderer2 } from '@angular/core';
import languageDesign from '../../pages/jsonfile/language-design.json';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  language = localStorage.getItem("radioLanguage");
  textForm: any;
  defaultSelectedRadio = localStorage.getItem("radioLanguage");
  selectedRadioGroup:any;
  selectedRadioItem:any;

  radio_list = [
    {
      id: '1',
      name: 'radio_list',
      value: 'eng',
      text: 'English',
      disabled: false,
      checked: false,
      color: 'primary'
    }, {
      id: '2',
      name: 'radio_list',
      value: 'ru',
      text: 'Russian',
      disabled: false,
      checked: true,
    }
  ];
  fontsize;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.checkStatusTheme();
    this.checkFontSize();
    this.checkRadio();
    this.checkLanguage();
  }

  checkLanguage() {
    if (this.language == "ru") {
      this.textForm = languageDesign.ru.settingForm;
    }
    if (this.language == "eng") {
      this.textForm = languageDesign.eng.settingForm;
    }
  }

  checkStatusTheme() {
    if (localStorage.getItem("theme") == "dark")
      return true;
    else return false;
  }

  checkFontSize() {
    return localStorage.getItem("fontSize");
  }

  checkRadio(){
    console.log(this.defaultSelectedRadio);
  }

  onToggleColorTheme(event) {
    if (event.detail.checked) {
      localStorage.setItem("theme", "dark");
      this.renderer.setAttribute(document.body, 'class', 'dark fontSize' + localStorage.getItem("fontSize"));
    }
    else {
      localStorage.setItem("theme", "light");
      this.renderer.setAttribute(document.body, 'class', 'light fontSize' + localStorage.getItem("fontSize"));
    }
  }

  onChange(fontsize) {
    console.log(localStorage.getItem("theme"));
    console.log(fontsize.detail.value);
    localStorage.setItem("fontSize", fontsize.detail.value);
    if (localStorage.getItem("theme") == "light") {
      this.renderer.setAttribute(document.body, 'class', 'light fontSize' + localStorage.getItem("fontSize"));
    } else if (localStorage.getItem("theme") == "dark") {
      this.renderer.setAttribute(document.body, 'class', 'dark fontSize' + localStorage.getItem("fontSize"));
    }
  }

  radioGroupChange(event) {
    console.log("radioGroupChange",event.detail);
    this.selectedRadioGroup = event.detail;
    localStorage.setItem("radioLanguage", event.detail.value);
  }

  radioFocus() {
    console.log("radioFocus");
  }
  radioSelect(event) {
    console.log("radioSelect",event.detail);
    this.selectedRadioItem = event.detail;
  }
  radioBlur() {
    console.log("radioBlur");
  }
}
