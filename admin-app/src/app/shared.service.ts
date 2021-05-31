import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "https://localhost:44367";

  constructor(
    private http: HttpClient
  ) { }

  headers() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  }

  login(val: any) {
    return this.http.post(this.APIUrl + '/login', val)
  }

  getUserList(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/users/readallusers', { headers: this.headers() })
  }

  addUser(val: any) {
    return this.http.post(this.APIUrl + '/users/addusers', val, { headers: this.headers() })
  }

  updateUser(val: any) {
    return this.http.put(this.APIUrl + '/users/updateusers', val, { headers: this.headers() })
  }

  deleteUser(val: any) {
    return this.http.delete(this.APIUrl + '/users/deleteusers/' + val, { headers: this.headers() })
  }

  getServiceList(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/services/readallservices', { headers: this.headers() })
  }

  addService(val: any) {
    return this.http.post(this.APIUrl + '/services/addservices', val, { headers: this.headers() })
  }

  updateService(val: any) {
    return this.http.put(this.APIUrl + '/services/updateservices', val, { headers: this.headers() })
  }

  deleteService(val: any) {
    return this.http.delete(this.APIUrl + '/services/deleteservices/' + val, { headers: this.headers() })
  }

  getListServiceList(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/listsevices/readalllistsevices', { headers: this.headers() })
  }

  addListService(val: any) {
    return this.http.post(this.APIUrl + '/listsevices/addlistsevices', val, { headers: this.headers() })
  }

  updateListService(val: any) {
    return this.http.put(this.APIUrl + '/listsevices/updatelistsevices', val, { headers: this.headers() })
  }

  deleteListService(val: any) {
    return this.http.delete(this.APIUrl + '/listsevices/deletelistsevices/' + val, { headers: this.headers() })
  }

  getConsultationrequestList(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/consultationRequests/readallconsultationRequests', { headers: this.headers() })
  }

  addConsultationrequest(val: any) {
    return this.http.post(this.APIUrl + '/consultationRequests/addconsultationRequests', val, { headers: this.headers() })
  }

  updateConsultationrequest(val: any) {
    return this.http.put(this.APIUrl + '/consultationRequests/updateconsultationRequests', val, { headers: this.headers() })
  }

  deleteConsultationrequest(val: any) {
    return this.http.delete(this.APIUrl + '/consultationRequests/deleteconsultationRequests/' + val, { headers: this.headers() })
  }

  getNewsList(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/news/readallnews', { headers: this.headers() })
  }

  addNews(val: any) {
    return this.http.post(this.APIUrl + '/news/addnews', val, { headers: this.headers() })
  }

  updateNews(val: any) {
    return this.http.put(this.APIUrl + '/news/updatenews', val, { headers: this.headers() })
  }

  deleteNews(val: any) {
    return this.http.delete(this.APIUrl + '/news/deletenews/' + val, { headers: this.headers() })
  }

  getEventList(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/events/readallevents', { headers: this.headers() })
  }

  addEvent(val: any) {
    return this.http.post(this.APIUrl + '/events/addevents', val, { headers: this.headers() })
  }

  updateEvent(val: any) {
    return this.http.put(this.APIUrl + '/events/updateevents', val, { headers: this.headers() })
  }

  deleteEvent(val: any) {
    return this.http.delete(this.APIUrl + '/events/deleteevents/' + val, { headers: this.headers() })
  }

  //Consultation Request
  //Info user and service list info
  getInfUserAndListService(val: any): Observable<any> {
    return this.http.post<any>(this.APIUrl + '/consultationRequests/getInfUserAndListService', val, { headers: this.headers() })
  }

  //update status Consultation Request
  updateConsultationStatus(val: any) {
    return this.http.put(this.APIUrl + '/consultationRequests/updateconsultation/'+ val, null, { headers: this.headers() })
  }
}
