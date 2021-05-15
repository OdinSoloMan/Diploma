import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-output',
  templateUrl: './output.page.html',
  styleUrls: ['./output.page.scss'],
})
export class OutputPage  {

  constructor(
    private router: Router,
  ) { }

  onExit() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.router.navigateByUrl('/login');
    console.log("exit")
  }

  ngOnInit() {

  }
}
