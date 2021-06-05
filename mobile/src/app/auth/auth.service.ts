import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.module';
import { map } from 'rxjs/operators';
import { DeteailService } from '../pages/service/deteail.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private detail: DeteailService) { }
  url = this.detail.getURL();

  register(user: User) {
    return this.http.post(`${this.url}/registration`, user)
  }

  login(credentials: User) {
    return this.http.post(`${this.url}/login`, credentials)
  }
}
