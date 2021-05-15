import { Component} from '@angular/core';
import { Router } from '@angular/router';
import languageDesign from '../../pages/jsonfile/language-design.json';

@Component({
  selector: 'app-output',
  templateUrl: './output.page.html',
  styleUrls: ['./output.page.scss'],
})
export class OutputPage  {
  language = localStorage.getItem("radioLanguage");
  textForm: any;

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
    this.checkLanguage();
  }

  checkLanguage() {
    if (this.language == "ru") {
      this.textForm = languageDesign.ru.outputForm;
    }
    if (this.language == "eng") {
      this.textForm = languageDesign.eng.outputForm;
    }
  }
}
