import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }      from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'ngx-bootstrap/alert';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { HomeComponent } from './home/home.component';
import { ShowAttendeesComponent } from './show-attendees/show-attendees.component';

import { DataService } from './_services/DataService';
import { SettingDirective } from './_services/app.settingDirective';
import {Routes, RouterModule} from '@angular/router'
import { MyEventComponent } from './my-event/my-event.component';
import { EventManagmentComponent } from './event-managment/event-managment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CreateEventComponent,
    HomeComponent,
    SettingDirective,
    ShowAttendeesComponent,
    MyEventComponent,
    EventManagmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule, NgbModule,
    
    AlertModule.forRoot()
  ],

  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
