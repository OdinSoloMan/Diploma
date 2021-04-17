import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Event, EventService } from '../pages/service/event.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage  {
  events: Event[];
  constructor( private service: EventService) { }

  async ngOnInit(){
    this.service.getAll().subscribe(response => {
      this.events = response;
      console.log(response);
    })
  }
}
