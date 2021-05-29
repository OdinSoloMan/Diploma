import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  test: "test"

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  clickTogle() {
    var menu_btn = document.querySelector("#menu-btn")
    var sidebar = document.querySelector("#sidebar")
    var container = document.querySelector(".my-container")
    menu_btn.addEventListener("click", () => {
      sidebar.classList.toggle("active-nav")
      container.classList.toggle("active-cont")
    })
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    this.router.navigateByUrl("login");
  }
}
