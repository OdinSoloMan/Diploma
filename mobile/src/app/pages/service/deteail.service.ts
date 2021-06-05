import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeteailService {
  url: any = "https://localhost:44367"
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
