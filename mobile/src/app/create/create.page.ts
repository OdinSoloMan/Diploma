import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage  {

  constructor(private http: HttpClient) { }

  onCreate(){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization : 'Bearer ' + token
    });

    this.http.get(`https://localhost:44367/events/readallevents`, 
     {headers}).subscribe(console.log);
  }

}
