import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';
import { Result } from 'src/app/model/event-result.payload';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';

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
  isJoinedVolunter: number;

  constructor(private activateRoute: ActivatedRoute, private router: Router, private eventService: EventService, private toastr: ToastrService
    , private localStorage: LocalStorageService) {
    this.eventId = this.activateRoute.snapshot.params.id;
   }

  ngOnInit(): void {
    this.getEventsById();
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
    }, error => {
      throwError(error);
    });
  }

  joinToEvent() {
    this.eventService.joinToEvent(this.eventId)
      .subscribe(data => {
        this.router.navigate(['/profile'],
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
          Swal.fire('You have successfully left the event!', 'You still have time to join@', 'success').then((result) => {
            location.reload();
          });
      }
      , error => {
        console.log(error);
        this.toastr.error('Leaving Failed! Please try again');
      });
  }

}
