import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventManagmentComponent } from './event-managment/event-managment.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyEventComponent } from './my-event/my-event.component';
import { RegisterComponent } from './register/register.component';
import { ShowAttendeesComponent } from './show-attendees/show-attendees.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'myevent', component: MyEventComponent },
  { path: 'manageevent', component:EventManagmentComponent },
  { path: 'manageevent/attendees/:eventID', component:ShowAttendeesComponent },
  { path: 'createevent', component:CreateEventComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
