import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from './pages/service/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  language = localStorage.getItem("language");
  textForm: any;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private languageService: LanguageService
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
    if (localStorage.getItem("language") == null) {
      localStorage.setItem("language", "ru")
    }
    this.languageService.setInitialAppLanguage(localStorage.getItem("language").toString());
  }
}
