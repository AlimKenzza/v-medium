import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';
import { Result } from 'src/app/model/event-result.payload';
import { EventService } from 'src/app/services/event.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { VolunteerResponse } from 'src/app/services/volunteer-response.payload';
import Swal from 'sweetalert2';
import { OrganizationRequest } from '../organization-create/organization-signup/organization-request.payload';

@Component({
  selector: 'app-event-shower',
  templateUrl: './event-shower.component.html',
  styleUrls: ['./event-shower.component.css']
})
export class EventShowerComponent implements OnInit {

  eventId: number;
  result: Result;
  volunteerId: number;
  volunteerIds: Array<any> = [];
  organization: OrganizationRequest;
  isJoinedVolunter: number;
  volunteers: VolunteerResponse[];

  constructor(private activateRoute: ActivatedRoute, private router: Router, private eventService: EventService, private toastr: ToastrService
    , private localStorage: LocalStorageService, private organizationService: OrganizationService) {
    this.eventId = this.activateRoute.snapshot.params.id;
   }

  ngOnInit(): void {
    this.getEventsById();
    this.getMembersByEventId();
    // this.volunteerId = this.eventService.getVolunteerId();
    // this.volunteerIds = this.eventService.getVolunteerIds();
    // this.isJoinedVolunter = this.isJoined();
  }
  
  isJoined(): number{
    this.volunteerId = this.eventService.getVolunteerId();
    this.volunteerIds = this.eventService.getVolunteerIds();
    if(this.volunteerIds.find(x => x === this.volunteerId)) {
      return 1;
    }
    return 0;
  }

  private getEventsById() {
    this.eventService.getEventById(this.eventId).subscribe(data => {
      this.result = data;
      this.localStorage.store('volunteerIds', data.volunteerIds);
      this.organization =  this.getOrganizationById(data.organizationId);
    }, error => {
      throwError(error);
    });
  }

  joinToEvent() {
    this.eventService.joinToEvent(this.eventId)
      .subscribe(data => {
        this.router.navigate(['/'],
          { queryParams: { registered: 'true' } });
          Swal.fire('You have successfully joined the event!', 'Be ready', 'success').then((result) => {
            location.reload();
          });
      }
      , error => {
        console.log(error);
        this.toastr.error('Join failed! Please try again');
      });
  }

  leaveEvent() {
    this.eventService.leaveEvent(this.eventId)
      .subscribe(data => {
        this.router.navigate(['/profile'],
          { queryParams: { registered: 'true' } });
          Swal.fire('You have successfully left the event!', 'You still have time to join', 'success').then((result) => {
            location.reload();
          });
      }
      , error => {
        console.log(error);
        this.toastr.error('Leaving Failed! Please try again');
      });
  }

  private getOrganizationById(companyId: number): OrganizationRequest{
    this.organizationService.getOrganizationById(companyId).subscribe(data => {
      this.organization = data;
      // this.localStorage.store('volunteerIds', data.volunteerIds);
    }, error => {
      throwError(error);
    });
    return this.organization;
  }

  getRole() :number {
    return this.localStorage.retrieve('role');
  }
  
  private getMembersByEventId() {
    this.eventService.getAllEventMembersForOrganization(this.eventId).subscribe(data => {
      this.volunteers = data;
    }, error => {
      throwError(error);
    });
  }

}
