import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../_services/ApiService';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-show-attendees',
  templateUrl: './show-attendees.component.html',
  styleUrls: ['./show-attendees.component.css']
})
export class ShowAttendeesComponent {

  public EventUrl = 'https://localhost:5001/api/Event';
  EventArray = [];
  attendeeList = [];

  eventName = null;
  date = null;
  time = null;

  _apiService: ApiService;

  eventID: Number = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this._apiService = new ApiService(http, this);
    this.route.params.forEach((params: Params) => {
      this.eventID = params['eventID'];
    });
  }

  ngOnInit() {
    this.viewAttendees();
  }

  viewAttendees() {
    const url = this.EventUrl + `/GetAttendees?eventID=${this.eventID}`;
    this._apiService.getData(url, (result) => {
      if (result['eventArray']) {
        this.EventArray = result['eventArray'];
        this.attendeeList = this.EventArray[`attendeeList`];
        this.date = this.EventArray['eventDate'];
        this.eventName = this.EventArray['eventName'];
        this.time = this.EventArray['eventTime'];
      } else {
        const url = this.EventUrl + `/getOne?eventID=${this.eventID}`;
        this._apiService.getData(url, (result) => {
          this.EventArray = result['eventArray'];
          this.date = this.EventArray['date'];
          this.eventName = this.EventArray['eventName'];
          this.time = this.EventArray['time'];
        });
      }
    });
  }

}
