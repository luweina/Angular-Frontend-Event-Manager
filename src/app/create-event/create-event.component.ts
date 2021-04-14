import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../_services/ApiService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {

  public EventUrl = 'https://localhost:5001/api/Event';
  _apiService: ApiService;

  error: string = '';
  success: string = '';

  eventModel = {
    Date: null,
    Time: null,
    EventName: null,
    Description: null,
  };

  constructor(private http: HttpClient, private router: Router) {
    this._apiService = new ApiService(http, this);
  }

  addEvent() {
    const isEmpty = Object.values(this.eventModel).includes(null);

    if (!isEmpty) {
       
        this._apiService.postData('api/Event', this.eventModel, (result) => {
          console.log(result)
        });
        this.success = 'new event has been created';
        this.error = null;
      
    } else {
      this.success = null;
      this.error = `field can not be empty`;
    }
  }

}
