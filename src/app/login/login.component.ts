import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../_services/ApiService';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_services/DataService';

@Component({
  //selector: 'app-root',
  templateUrl: 'login.component.html',
})
export class LoginComponent {
  public LoginUrl = 'https://localhost:5001/api/login';
  title = 'Event Manager';

  password = 'P@ssw0rd!';
  username = 'Admin@Home.com';

  token = '';
  message = 'Not logged in.';

  _currentUser = '';

  secureData: string = '';
  managerData: string = '';
  reqInfo: any = {};
  msgFromServer: string = '';

  role = null;

  _apiService: ApiService;
  constructor(private http: HttpClient, private data: DataService, private router: Router,) {
    // Pass in http module and pointer to AppComponent.
    this.showContentIfLoggedIn();
    this._apiService = new ApiService(http, this);
    this.data.currentRole.subscribe((role) => (this.role = role));
    
  }

  showContentIfLoggedIn() {
    // Logged in if token exists in browser cache.
    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
      this.message = 'The user has been logged in.';
    } else {
      this.message = 'Not logged in.';
      this.token = '';
    }
  }

  //------------------------------------------------------------
  // Log user in.
  //------------------------------------------------------------
  login() {
    let url = this.LoginUrl;

    this.http
      .post(url, {
        Email: this.username,
        Password: this.password,
        RememberMe: false,
      })
      .subscribe(
        // Data is received from the post request.
        (data) => {
          // Inspect the data to know how to parse it.
          //console.log(data);
          if (data['tokenString'] != null) {
            this.token = data['tokenString'];
            this._currentUser = data['userName'];
            this.role = data['role'][0] ? data['role'][0]['roleId'] : null;
            sessionStorage.setItem('auth_token', data['tokenString']);
            sessionStorage.setItem('UserName', this._currentUser);
            sessionStorage.setItem('Role', this.role);
            this.message = 'The user has been logged in.';
            this.data.setRole(this.role);
            this.data.setUserName(this._currentUser);
            
          }
          this.router.navigateByUrl("/")
        },
        // An error occurred. Data is not received.
        (error) => {
          alert(JSON.stringify(error));
        }
        
      );
     
      
  }

  logout() {
    this.message = "You have logged out"
    console.log (this.message)
    sessionStorage.clear();
    this.showContentIfLoggedIn();

    // Clear data.
    this.secureData = '';
    this.managerData = '';
    this.reqInfo = {};
    this.msgFromServer = '';
    this.role = null;
    
  }
}