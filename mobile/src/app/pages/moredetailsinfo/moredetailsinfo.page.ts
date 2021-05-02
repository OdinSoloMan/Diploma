import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-moredetailsinfo',
  templateUrl: './moredetailsinfo.page.html',
  styleUrls: ['./moredetailsinfo.page.scss'],
})
export class MoredetailsinfoPage implements OnInit {
  state: Observable<object>;
  moreInfs: any;

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let moreInf = [
      {
        g: '<p><b>Шаг 1. Подготовьте заявление Р21001 на открытие ИП</b></p>' +
          '<p>В настоящее время набирают популярность онлайн сервисы по подготовке документов на регистрацию ИП и ООО. Основным их преимуществом, помимо быстроты и удобства, является правильное заполнение заявления о государственной регистрации физического лица в качестве индивидуального предпринимателя по форме P21001, ошибка в котором может повлечь за собой отказ в регистрации ИП. Вы вводите необходимые данные непосредственно через страницы сайта и на выходе получаете готовые к распечатке и подаче на государственную регистрацию ИП документы'
      },
      { g: "zz" },
    ]
    this.state = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
    console.log("ww", window.history.state.id);
    console.log(moreInf[0])
    this.moreInfs = moreInf[window.history.state.id].g;
  }

}
