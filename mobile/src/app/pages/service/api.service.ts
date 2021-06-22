import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface User {
  guidUsersId?: string;
  fullName?: string;
  email?: string;
  telephone?: string;
  position?: string;
  typeOfEnterprise?: string;
  password?: string;
  role?: string;
}

export interface Event {
  guidEventsId: string;
  eventTitle: string;
  descriptionOfTheEvent: string;
  plannedStartDate: string;
  imageEvents: string;
  isConsidered: string;
  users: string;
}

export interface News {
  guidNewsId: string;
  newTitle: string;
  newDescription: string;
  dataNew: string;
  imageNew: string;
  isConsidered: string;
  users: string;
}

export interface ListSevice {
  guidListSevicesId: string,
  description: string,
  consultationRequests: [],
  servicesId: []
}

export interface Services {
  guidServicesId: string,
  name: string,
  listServices: ListSevice[]
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  readonly APIUrl = "https://192.168.1.67:45455";

  getURL(){
    return this.APIUrl
  }

  constructor(private http: HttpClient,) { }

  headers() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  }

  register(user: User) {
    return this.http.post(this.APIUrl + '/registration', user)
  }

  login(credentials: User) {
    return this.http.post(this.APIUrl + '/login', credentials)
  }

  getAllEvents() {
    return this.http.get<[Event]>(this.APIUrl + '/events/readalltevents', { headers: this.headers() });
  }

  getAllNews() {
    return this.http.get<[News]>(this.APIUrl + '/news/readalltnews', { headers: this.headers() });
  }

  getAllServices() {
    return this.http.post<[Services]>(this.APIUrl + '/services/readallservicesfullinfo', null, { headers: this.headers() });
  }

  readUserId() {
    return this.http.get<User>(this.APIUrl + '/users/' + localStorage.getItem('user_id'), { headers: this.headers() });
  }
}
