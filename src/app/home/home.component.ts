import { Component, Input, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { ProfilePayload } from '../auth/shared/profile-response.payload';
import { MembershipService } from '../services/membership.service';
import { OrganizationService } from '../services/organization.service';
import { VolunteerService } from '../services/volunteer.service';
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: ProfilePayload;
  lang: string;
  supportLanguages = ['en', 'ru'];

  constructor(
    private volunteerService: VolunteerService, private orgService: OrganizationService, private membershipService: MembershipService,
    private localStorage: LocalStorageService, private translateService: TranslateService) { 
      this.translateService.addLangs(this.supportLanguages);
      this.translateService.setDefaultLang('ru');
      const browserLang = this.translateService.getBrowserLang();
      this.translateService.use(browserLang);
    }

  ngOnInit(): void {
    this.orgService.getOrganizationInfo().subscribe(data => {
      this.profile = data;
    }, error => {
      throwError(error);
    });

    this.volunteerService.getVolunteerInfo().subscribe(data => {
      this.profile = data;
    }, error => {
      throwError(error);
    });

    this.membershipService.validateMembership().subscribe(data => {
      console.log(data);
    }, error => {
      throwError(error);
    });
    this.translateService.use(this.localStorage.retrieve('lang'));
  }

}
