import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-output',
  templateUrl: './output.page.html',
  styleUrls: ['./output.page.scss'],
})
export class OutputPage  {

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) { }

  onExit() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/autoform');
    console.log("exit")
  }

  onToggleColorTheme(event){
    console.log(event.detail.checked);

    if(event.detail.checked){
      localStorage.setItem("dark", "true");
      //document.body.setAttribute('class', 'dark');
      this.renderer.setAttribute(document.body, 'class', 'dark');
    }
    else{
      localStorage.setItem("dark", "false");
      //document.body.setAttribute('class', 'light');
      this.renderer.setAttribute(document.body, 'class', 'light');
    }
  }
}
