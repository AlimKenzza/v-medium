import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login/login.component';
import { NewsComponent } from './components/news/news.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ToastrModule } from 'ngx-toastr';
import { SignupNewComponent } from './auth/signup-new/signup-new.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { OrganizationSignupComponent } from './components/organization-create/organization-signup/organization-signup.component';
import { CookieService } from 'ngx-cookie-service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DatepickerComponent } from './components/datepicker/datepicker/datepicker.component';
import { VolunteerProfileComponent } from './components/volunteer-profile/volunteer-profile.component';
import { OrganizationProfileComponent } from './components/organization-profile/organization-profile.component';
import { EventComponent } from './components/event/event.component';
import { EventShowerComponent } from './components/event-shower/event-shower.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { CompanyCrudComponent } from './components/company-crud/company-crud.component';
import { ListVolunteersComponent } from './components/list-volunteers/list-volunteers.component';
import { ListOrganizationsComponent } from './components/list-organizations/list-organizations.component';
import { OrganizationCardComponent } from './components/organization-card/organization-card.component';
import { VolunteerCardComponent } from './components/volunteer-card/volunteer-card.component';
import { CandidateManageComponent } from './components/candidate-manage/candidate-manage.component';
import { OrganizationMembersComponent } from './components/organization-members/organization-members.component';
import { InvitationsComponent } from './components/invitations/invitations.component';
import { TestMapComponent } from './components/test-map/test-map.component';
import { AgmCoreModule } from '@agm/core';
import { AnimationComponent } from './components/animation/animation.component';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core'
import { TranslateHttpLoader} from '@ngx-translate/http-loader'



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NewsComponent,
    SignupNewComponent,
    ProfileComponent,
    OrganizationSignupComponent,
    DatepickerComponent,
    VolunteerProfileComponent,
    OrganizationProfileComponent,
    EventComponent,
    EventShowerComponent,
    CreateEventComponent,
    AdminPanelComponent,
    CompanyCrudComponent,
    ListVolunteersComponent,
    ListOrganizationsComponent,
    OrganizationCardComponent,
    VolunteerCardComponent,
    CandidateManageComponent,
    OrganizationMembersComponent,
    InvitationsComponent,
    TestMapComponent,
    AnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  }),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyASf3ARKR_Ftf0IC3rWB3h7_ztZW8W2XOc',
      libraries: ['places']
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}