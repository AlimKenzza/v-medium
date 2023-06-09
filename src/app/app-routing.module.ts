import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { SignupNewComponent } from './auth/signup-new/signup-new.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { CandidateManageComponent } from './components/candidate-manage/candidate-manage.component';
import { CompanyCrudComponent } from './components/company-crud/company-crud.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { DatepickerComponent } from './components/datepicker/datepicker/datepicker.component';
import { EventShowerComponent } from './components/event-shower/event-shower.component';
import { EventComponent } from './components/event/event.component';
import { InvitationsComponent } from './components/invitations/invitations.component';
import { ListOrganizationsComponent } from './components/list-organizations/list-organizations.component';
import { ListVolunteersComponent } from './components/list-volunteers/list-volunteers.component';
import { NewsComponent } from './components/news/news.component';
import { OrganizationCardComponent } from './components/organization-card/organization-card.component';
import { OrganizationSignupComponent } from './components/organization-create/organization-signup/organization-signup.component';
import { OrganizationMembersComponent } from './components/organization-members/organization-members.component';
import { OrganizationProfileComponent } from './components/organization-profile/organization-profile.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { TestMapComponent } from './components/test-map/test-map.component';
import { VolunteerCardComponent } from './components/volunteer-card/volunteer-card.component';
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
  { path: 'test-map', component: TestMapComponent},
  { path: 'organizations', component: ListOrganizationsComponent},
  { path: 'organization/:id', component: OrganizationCardComponent},
  { path: 'volunteer/:id', component: VolunteerCardComponent},
  { path: 'company-candidates', component: CandidateManageComponent},
  { path: 'company-members', component: OrganizationMembersComponent},
  { path: 'invitations', component: InvitationsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
