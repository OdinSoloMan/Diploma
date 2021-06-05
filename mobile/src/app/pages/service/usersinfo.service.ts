import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeteailService } from './deteail.service';

export interface User{
  guidUsersId: string;
  fullName: string;
  email: string;
  telephone: string;
  position: string;
  typeOfEnterprise: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersinfoService {
  constructor(private http: HttpClient, private detail: DeteailService) { }
  url = this.detail.getURL() +'/users';

  readUserId(){
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('user_id');
    const headers = new HttpHeaders({
      Authorization : 'Bearer ' + token
    });
    return this.http.get<User>(this.url+'/'+id, {headers});
  }
}
