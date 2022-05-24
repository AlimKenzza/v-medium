import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { ProfilePayload } from '../auth/shared/profile-response.payload';
import { OrganizationService } from '../services/organization.service';
import { VolunteerService } from '../services/volunteer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: ProfilePayload;

  constructor(
    private volunteerService: VolunteerService, private orgService: OrganizationService) { }

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
  }

}
