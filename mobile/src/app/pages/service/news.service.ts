import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface News{
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
  private url = 'https://localhost:44367/news';
  constructor(private http: HttpClient) { }

  getAll(){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization : 'Bearer ' + token
    });
    return this.http.get<[News]>(this.url+'/readalltnews', {headers});
  }
}
