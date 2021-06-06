import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeteailService {
  url: any = "https://192.168.1.67:45455"
  constructor() { }

  data: string;

  setData(data) {
      this.data = data;
  }

  getData(){
     return this.data;
  }

  getURL(){
    return this.url;
 }
}
