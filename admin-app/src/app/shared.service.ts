import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "https://localhost:44367";

  constructor(
    private http: HttpClient
  ) { }

  getUserList(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/users/readallusers')
  }

  addUser(val: any) {
    return this.http.post(this.APIUrl + '/users/addusers', val)
  }

  updateUser(val: any) {
    return this.http.put(this.APIUrl + '/users/updateusers', val)
  }

  deleteUser(val: any) {
    return this.http.delete(this.APIUrl + '/users/deleteusers/' + val)
  }

  getServiceList(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/services/readallservices')
  }

  addService(val: any) {
    return this.http.post(this.APIUrl + '/services/addservices', val)
  }

  updateService(val: any) {
    return this.http.put(this.APIUrl + '/services/updateservices', val)
  }

  deleteService(val: any) {
    return this.http.delete(this.APIUrl + '/services/deleteservices/' + val)
  }
}
