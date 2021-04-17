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
    localStorage.removeItem('user_id');
    this.router.navigateByUrl('/autoform');
    console.log("exit")
  }

  ngOnInit() {
    this.checkStatusTheme();
  }

  checkStatusTheme(){
    return localStorage.getItem("dark");
  }

  onToggleColorTheme(event){
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
