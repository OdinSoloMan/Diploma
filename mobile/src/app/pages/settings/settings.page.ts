import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  fontsize;
  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.checkStatusTheme();
    this.checkFontSize();
  }

  checkStatusTheme() {
    if (localStorage.getItem("theme") == "dark")
      return true;
    else return false;
  }

  checkFontSize(){
    return localStorage.getItem("fontSize");
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
    //let leng = document.getElementsByTagName('body');
    console.log(localStorage.getItem("theme"));
    console.log(fontsize);
    localStorage.setItem("fontSize", fontsize);
    if (localStorage.getItem("theme") == "light") {
      this.renderer.setAttribute(document.body, 'class', 'light fontSize' + localStorage.getItem("fontSize"));
    } else if (localStorage.getItem("theme") == "dark") {
      this.renderer.setAttribute(document.body, 'class', 'dark fontSize' + localStorage.getItem("fontSize"));
    }
  }
}
