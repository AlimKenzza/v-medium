import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { OrganizationSignupComponent } from './auth/organization-signup/organization-signup.component';
import { SignupNewComponent } from './auth/signup-new/signup-new.component';
import { SignupComponent } from './auth/signup/signup/signup.component';
import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'signup', component:  SignupComponent},
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent},
  { path: 'signup-company', component:OrganizationSignupComponent},
  { path: 'news', component: NewsComponent},
  { path: 'company-signup', component: OrganizationSignupComponent},
  { path: 'new-signup', component: SignupNewComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
