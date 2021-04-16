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
    console.log(localStorage.getItem('dark'));
    if(localStorage.getItem('dark') == "true"){
      this.renderer.setAttribute(document.body, 'class', 'dark');
    }
  }
}
