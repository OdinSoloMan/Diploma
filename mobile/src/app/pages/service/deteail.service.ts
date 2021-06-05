import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeteailService {

  constructor() { }

  data: string;

  setData(data) {
      this.data = data;
  }

  getData(){
     return this.data;
  }
}
