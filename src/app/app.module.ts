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
import { HttpClientModule } from '@angular/common/http';
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
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
