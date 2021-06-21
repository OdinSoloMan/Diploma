import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeteailService {
 
  constructor() { }

  data: string;
  detailSerivceInsert: any;

  setData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  getDetailSerivceInsert() {
    return this.detailSerivceInsert;
  }

  setDetailSerivceInsert(detail) {
    this.detailSerivceInsert = detail;
  }
}
