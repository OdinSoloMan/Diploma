import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import languageDesign from '../app/pages/jsonfile/language-design.json';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  language = localStorage.getItem("radioLanguage");
  textForm: any;

  constructor(
    private router: Router,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/news');
    }
    else {
      this.router.navigateByUrl('login');
    }
    console.log(localStorage.getItem('theme'));
    if (localStorage.getItem("fontSize") == null) {
      localStorage.setItem("fontSize", "20");
    }
    if (localStorage.getItem('theme') == null) {
      localStorage.setItem("theme", "light");
      this.renderer.setAttribute(document.body, 'class', 'light fontSize' + localStorage.getItem("fontSize"));
    }
    if (localStorage.getItem('theme') == "dark") {
      this.renderer.setAttribute(document.body, 'class', 'dark fontSize' + localStorage.getItem("fontSize"));
    }
    if (localStorage.getItem('theme') == "light") {
      this.renderer.setAttribute(document.body, 'class', 'light fontSize' + localStorage.getItem("fontSize"));
    }
    if (localStorage.getItem("radioLanguage") == null) {
      localStorage.setItem("radioLanguage", "ru")
    }
    this.checkLanguage()
  }

  checkLanguage() {
    if (this.language == "ru") {
      this.textForm = languageDesign.ru.menuForm;
    }
    if (this.language == "eng") {
      this.textForm = languageDesign.eng.menuForm;
    }
  }
}
