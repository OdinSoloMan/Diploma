import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  private url = 'https://localhost:44367/users';
  constructor(private http: HttpClient) { }

  readUserId(){
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('user_id');
    const headers = new HttpHeaders({
      Authorization : 'Bearer ' + token
    });
    return this.http.get<User>(this.url+'/'+id, {headers});
  }
}
