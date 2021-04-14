import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../_services/ApiService';
@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public RegisterUrl = 'https://localhost:5001/api/Register';
  _apiService: ApiService;

  error: string = '';
  success: string = '';

  userFields = {
    UserName: null,
    Email: null,
    FirstName: null,
    LastName: null,
    Password: null,
    ConfirmPassword: null,
  };

  constructor(private http: HttpClient) {
    // Pass in http module and pointer to AppComponent.
    this._apiService = new ApiService(http, this);
  }

  register() {
    const isEmpty = Object.values(this.userFields).includes(null);
    if (isEmpty) this.error = `All fields are required`;
    else {
      console.log(this.userFields);
      this.http.post(this.RegisterUrl, this.userFields).subscribe(
        // Data is received from the post request.
        (data) => {
          // Inspect the data to know how to parse it.
          this.success = 'register successful';
          this.error = null;
        },
        // An error occurred. Data is not received.
        (error) => {
          this.error = JSON.stringify(error)
          this.error = JSON.parse(this.error)

          console.log(this.error['error']['errors'])
          this.success = null
        }
      );
    }
  }
}

