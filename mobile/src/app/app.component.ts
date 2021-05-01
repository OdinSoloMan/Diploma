import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private renderer: Renderer2) { }
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/create');
    }
    else {
      this.router.navigateByUrl('autoform');
    }
    console.log(localStorage.getItem('theme'));
    if(localStorage.getItem("fontSize")==null){      
      localStorage.setItem("fontSize", "20");
    }
    if(localStorage.getItem('theme') == null){
      localStorage.setItem("theme", "light");
      this.renderer.setAttribute(document.body, 'class', 'light fontSize' + localStorage.getItem("fontSize"));
    }
    if(localStorage.getItem('theme') == "dark"){
      this.renderer.setAttribute(document.body, 'class', 'dark fontSize' + localStorage.getItem("fontSize"));
    }
    if(localStorage.getItem('theme') == "light"){
      this.renderer.setAttribute(document.body, 'class', 'light fontSize' + localStorage.getItem("fontSize"));
    }
  }
}
