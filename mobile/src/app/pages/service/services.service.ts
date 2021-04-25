import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ListSevice {
  guidListSevicesId: string,
  description : string,
  consultationRequests : [],
  servicesId : []
}

export interface Services {
  guidServicesId : string,
  name : string,
  listServices : ListSevice[]
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private url = 'https://localhost:44367/services';

  constructor(private http: HttpClient) { }

  getAll(){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization : 'Bearer ' + token
    });
    return this.http.post<[Services]>(this.url+'/readallservicesfullinfo', null,{headers});
  }
}
