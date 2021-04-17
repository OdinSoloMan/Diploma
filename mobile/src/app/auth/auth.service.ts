import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.module';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "https://localhost:44367"
  constructor(private http: HttpClient) { }

  register(user: User){
    return this.http.post(`${this.url}/registration`, user)
  }

  login(credentials : User){
    return this.http.post(`${this.url}/login`, credentials)
  }
}
