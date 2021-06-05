import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeteailService } from './deteail.service';

export interface News {
  guidNewsId: string;
  newTitle: string;
  newDescription: string;
  dataNew: string;
  imageNew: string;
  isConsidered: string;
  users: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient, private detail: DeteailService) { }
  url = this.detail.getURL() + '/news';

  getAll() {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get<[News]>(this.url + '/readalltnews', { headers });
  }
}
