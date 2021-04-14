import { Component, Input } from '@angular/core';
import { DataService } from './DataService';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  // Selector uses lower case with hyphens.
  selector: 'setting-directive',
  templateUrl: '../app.component.html',
})
export class SettingDirective {
  @Input()
  role: string = null;

  @Input()
  userName: string = null;

  @Input()
  message: string = null

  constructor(private data: DataService, private router: Router) {
    this.data.currentRole.subscribe((role) => (this.role = role));
    this.data.currentUser.subscribe((name) => (this.userName = name));
    this.data.currentMessage.subscribe((message) =>(this.message = message))
  }

  show() {
    console.log(this.role);
  }

  logout() {
    this.message = "You have logged out"
    this.router.navigateByUrl("/")
    
    sessionStorage.clear();
    this.role = null;
    this.userName = null;
    
  }
 
}