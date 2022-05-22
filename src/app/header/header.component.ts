import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';
import { AuthService } from '../auth/shared/auth.service';
import { ProfilePayload } from '../auth/shared/profile-response.payload';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;
  profile: ProfilePayload;

  constructor(private authService: AuthService, private router: Router, private localStorage: LocalStorageService, private cookieService: CookieService) {}

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }

  logout() {
    this.localStorage.clear();
    console.log(this.authService.getRefreshTokenFromCookies());
    this.authService.logout(this.authService.getRefreshTokenFromCookies());
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }

  getProfile() {
    this.authService.userProfile().subscribe(data => {
      this.profile = data;
      this.localStorage.store('role', this.profile.role);
      this.localStorage.store('email', this.profile.email);
      this.localStorage.store('firstName', this.profile.firstName);
      this.localStorage.store('lastName', this.profile.lastName);
      this.localStorage.store('phone', this.profile.phone);
      this.router.navigateByUrl('/profile');
    }, error => {
      throwError(error);
    });
  }



}
