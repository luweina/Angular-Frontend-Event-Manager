import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../_services/ApiService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-managment',
  templateUrl: './event-managment.component.html',
  styleUrls: ['./event-managment.component.css']
})
export class EventManagmentComponent {

  public EventUrl = 'https://localhost:5001/api/Event';
  EventArray = [];
  _apiService: ApiService;

  constructor(private http: HttpClient, private router: Router) {
    this._apiService = new ApiService(http, this);
    this.getAllEvents();
  }

  getAllEvents() {
    this.http.get(this.EventUrl).subscribe(
      (data) => {
        this.EventArray = data['eventArray'];
      },
      (error) => {
        alert(JSON.stringify(error));
      }
    );
  }

  viewAttendees(eventID) {
    this.router.navigate([`manageevent/attendees/${eventID}`]);
  }

  deleteEvent(eventID) {
    const url = this.EventUrl + `/Delete?eventID=${eventID}`;
    this._apiService.getData(url, (result) => {
      alert(result.message);
      window.location.reload();
    });
  }

}
