import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './_services/ApiService';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `<setting-directive></setting-directive>`,
})
export class AppComponent {
  title: "frontend"
}
