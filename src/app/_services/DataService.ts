import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private role = new BehaviorSubject<string>('');
  private userName = new BehaviorSubject<string>('');
  private Message = new BehaviorSubject<string>('');
  currentRole = this.role.asObservable();
  currentUser = this.userName.asObservable();
  currentMessage = this.Message.asObservable();

  constructor() {
    if (sessionStorage.getItem('auth_token')) {
      this.setRole(sessionStorage.getItem('Role'));
      this.setUserName(sessionStorage.getItem('UserName'));
    }
  }

  setRole(role: string) {
    this.role.next(role);
  }

  setUserName(userName: string) {
    this.userName.next(userName);
  }
}
