import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { SignupNewComponent } from './auth/signup-new/signup-new.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { CompanyCrudComponent } from './components/company-crud/company-crud.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { DatepickerComponent } from './components/datepicker/datepicker/datepicker.component';
import { EventShowerComponent } from './components/event-shower/event-shower.component';
import { EventComponent } from './components/event/event.component';
import { ListOrganizationsComponent } from './components/list-organizations/list-organizations.component';
import { ListVolunteersComponent } from './components/list-volunteers/list-volunteers.component';
import { NewsComponent } from './components/news/news.component';
import { OrganizationSignupComponent } from './components/organization-create/organization-signup/organization-signup.component';
import { OrganizationProfileComponent } from './components/organization-profile/organization-profile.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { VolunteerProfileComponent } from './components/volunteer-profile/volunteer-profile.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent},
  { path: 'news', component: NewsComponent},
  { path: 'new-signup', component: SignupNewComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'company-signup', component: OrganizationSignupComponent},
  { path: 'date', component: DatepickerComponent},
  { path: 'volunteer-profile', component: VolunteerProfileComponent},
  { path: 'events', component: EventComponent},
  { path: 'event/:id', component: EventShowerComponent},
  { path: 'create-event', component: CreateEventComponent},
  { path: 'company-events', component: OrganizationProfileComponent},
  { path: 'admin', component: AdminPanelComponent},
  { path: 'company-crud', component: CompanyCrudComponent},
  { path: 'volunteers', component: ListVolunteersComponent},
  { path: 'organizations', component: ListOrganizationsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
