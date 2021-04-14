import { APP_ID, Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../_services/ApiService';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent{
  public EventApi = 'https://localhost:5001/api/Event';
  EventArray = [];
  _apiService: ApiService;

  constructor(private http: HttpClient) {
    this._apiService = new ApiService(http, this);
    this.getMyEvents();
  }

  getMyEvents() {
    const api = this.EventApi + '/myEvent';
    this._apiService.getData(api, (result) => {
      if (result.errorMessage) {
        alert(result.errorMessage);
      } else {
        
        this.EventArray = result.eventArray;
      }
    });
  }

  leaveEvent(eventID) {
    const api = this.EventApi + `/leaveEvent?eventID=${eventID}`;
    this._apiService.getData(api, (result) => {
      result.error ? alert(result.error) : alert(result.statusCode);
    });
    window.location.reload();
  }

}
