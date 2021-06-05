import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeteailService } from './deteail.service';

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
  constructor(private http: HttpClient, private detail: DeteailService) { }
  url = this.detail.getURL() +'/events';

  getAll(){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization : 'Bearer ' + token
    });
    return this.http.get<[Event]>(this.url+'/readalltevents', {headers});
  }
}
