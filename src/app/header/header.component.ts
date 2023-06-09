import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';
import { AuthService } from '../auth/shared/auth.service';
import { ProfilePayload } from '../auth/shared/profile-response.payload';
import { CookieService } from 'ngx-cookie-service';
import { VolunteerService } from '../services/volunteer.service';
import { OrganizationService } from '../services/organization.service';
import { TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;
  profile: ProfilePayload;
  supportLanguages = ['en', 'ru'];
  lang: string;

  constructor(private authService: AuthService, private router: Router, private localStorage: LocalStorageService, private cookieService: CookieService,
    private volunteerService: VolunteerService, private orgService: OrganizationService,
    private translateService: TranslateService) {
      this.translateService.addLangs(this.supportLanguages);
      this.translateService.setDefaultLang('ru');
      const browserLang = this.translateService.getBrowserLang();
      this.translateService.use(browserLang);
    }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }

  logout() {
    this.localStorage.clear();
    // console.log(this.authService.getRefreshTokenFromCookies());
    // this.authService.logout(this.authService.getRefreshTokenFromCookies());
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
      this.localStorage.store('createdDate', this.profile.createdAt);
      this.localStorage.store('id', this.profile.id);
      this.localStorage.store('image', this.profile.avatar);
      this.router.navigateByUrl('/profile');
    }, error => {
      throwError(error);
    });

    
  }

  getRole() :number {
    return this.localStorage.retrieve('role');
  }

  selectLang(lang: string) {
    this.translateService.use(lang);
    this.localStorage.store('lang', lang);
  }



}
