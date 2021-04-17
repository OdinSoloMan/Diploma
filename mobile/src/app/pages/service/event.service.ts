import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Event{
  guidEventsId: string;
  eventTitle: string;
  descriptionOfTheEvent: string;
  plannedStartDate: string;
  imageEvents: string;
  isConsidered: string;
  users: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private url = 'https://localhost:44367/events';
  constructor(private http: HttpClient) { }

  getAll(){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization : 'Bearer ' + token
    });
    return this.http.get<[Event]>(this.url+'/readallevents', {headers});
  }
}
