import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent implements OnInit {

  constructor(private service: SharedService) { }

  EventList: any = [];

  ModalTitle: string;
  ActivateAddEditEventComp: boolean = false;
  event: any;

  totalRecords: String;
  page: Number = 1

  countPage: any = 1;
  ngOnInit(): void {
    console.log(this.countPage)
    this.refrechEventList();
  }
  guidEventsIdFilter: string = "";
  eventTitleFilter: string = "";
  descriptionOfTheEventFilter: string = "";
  plannedStartDateFilter: string = "";
  imageEventsFilter: string = "";
  isConsideredFilter: string = "";
  usersIdFilter: string = "";
  EventListWithoutFilter: any = [];

  addClick() {
    this.event = {
      guidEventsId: 0,
      eventTitle: '',
      descriptionOfTheEvent: '',
      plannedStartDate: '',
      imageEvents: '',
      isConsidered: '',
      usersId: '',
    }
    this.ModalTitle = "Add Event";
    this.ActivateAddEditEventComp = true;
  }

  editClick(item) {
    this.event = item;
    this.ModalTitle = "Edit Event"
    this.ActivateAddEditEventComp = true;
  }

  deleteClick(item) {
    if (confirm('Are you sure??')) {
      this.service.deleteEvent(item.guidEventsId).subscribe(data => {
        alert(JSON.stringify(data).toString());
        this.refrechEventList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditEventComp = false;
    this.refrechEventList();
  }

  refrechEventList(){
    this.service.getEventList().subscribe(data => {
      this.EventList = data;
      this.EventListWithoutFilter = data;
      this.totalRecords = data.length;
      console.log(this.totalRecords);
    })
  }

  filterFn() {
    var guidEventsIdFilter = this.guidEventsIdFilter;
    var eventTitleFilter = this.eventTitleFilter;
    var descriptionOfTheEventFilter = this.descriptionOfTheEventFilter;
    var plannedStartDateFilter = this.plannedStartDateFilter;
    var imageEventsFilter = this.imageEventsFilter;
    var isConsideredFilter = this.isConsideredFilter;
    var usersIdFilter = this.usersIdFilter;

    this.EventList = this.EventListWithoutFilter.filter(function (el) {
      return el.guidEventsId.toString().toLowerCase().includes(
        guidEventsIdFilter.toString().trim().toLowerCase()
      ) &&
        el.eventTitle.toString().toLowerCase().includes(
          eventTitleFilter.toString().trim().toLowerCase()
        ) && el.descriptionOfTheEvent.toString().toLowerCase().includes(
          descriptionOfTheEventFilter.toString().trim().toLowerCase()
        ) && el.plannedStartDate.toString().toLowerCase().includes(
          plannedStartDateFilter.toString().trim().toLowerCase()
        ) && el.imageEvents.toString().toLowerCase().includes(
          imageEventsFilter.toString().trim().toLowerCase()
        ) && el.isConsidered.toString().toLowerCase().includes(
          isConsideredFilter.toString().trim().toLowerCase()
        ) && el.usersId.toString().toLowerCase().includes(
          usersIdFilter.toString().trim().toLowerCase())
    })
    this.totalRecords = this.EventList.length
  }

  sortResult(prop, asc) {
    this.EventList = this.EventList.sort(function (a, b) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0)
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0)
      }
    })
  }

  switchFnCountPage(e){
    console.log(e);
    this.countPage = e;
    //this.countPage;
  }
}
