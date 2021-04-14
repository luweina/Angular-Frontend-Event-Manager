import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../_services/ApiService';
import { Router } from '@angular/router';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  templateUrl: `home.component.html`,
})
export class HomeComponent {
  public EventUrl = 'https://localhost:5001/api/Event';

  EventArray = [];
  _apiService: ApiService;

  error: string = '';
  success: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this._apiService = new ApiService(http, this);
    this.getAllEvents();
  }

  getAllEvents() {
    this.http.get(this.EventUrl).subscribe(
      (data) => {
        //console.log(data);
        this.EventArray = data['eventArray'];
      },
      (error) => {
        alert(JSON.stringify(error));
      }
    );
  }

  attend(eventID) {
    const isLogin = sessionStorage.getItem('auth_token');
    if (isLogin) {
      const url = this.EventUrl + `/JoinEvent?eventID=${eventID}`;
      this._apiService.getData(url, (result) => {
        if (result.error) {
          this.error = "There is an error"
          this.success = null
          
        } else{
          this.success = "You will attend the event";
          this.error = null
        }
       
      });
    } else {
      
      this.router.navigate(['/login']);
    }
  }
}