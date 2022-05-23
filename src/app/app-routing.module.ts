import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { SignupNewComponent } from './auth/signup-new/signup-new.component';
import { DatepickerComponent } from './components/datepicker/datepicker/datepicker.component';
import { NewsComponent } from './components/news/news.component';
import { OrganizationSignupComponent } from './components/organization-create/organization-signup/organization-signup.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent},
  { path: 'news', component: NewsComponent},
  { path: 'new-signup', component: SignupNewComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'company-signup', component: OrganizationSignupComponent},
  { path: 'date', component: DatepickerComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
