import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { EventRequestForCreate } from 'src/app/model/event-create-request.payload';
import { Body } from 'src/app/model/event-response.payload';
import { Result } from 'src/app/model/event-result.payload';
import { EventUpdate } from 'src/app/model/event-update-request.payload';
import { EventService } from 'src/app/services/event.service';
import { OrganizationService } from 'src/app/services/organization.service';
import Swal from 'sweetalert2';
import { OrganizationRequest } from '../../organization-create/organization-signup/organization-request.payload';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  events: Observable<Body>;
  results: Result[];
  event: EventUpdate;
  eventForm: FormGroup;
  isError: boolean;
  organization: OrganizationRequest;
  display ='none';
  region: number;

  constructor(private eventService: EventService, private router: Router, private organizationService: OrganizationService, private toastr: ToastrService) { 
    this.event =  {
      location: '',
      region: 0,
      image: '',
      description: '',
      deadline: '',
      endDate: '',
      eventName: '',
      volunteeringCategory: 0,
      eventId: 0
      };
  }

  public modalHandler(val: boolean) {

    if (val) {
        this.display = 'block';
        // button.classList.add("hidden");
    } else {
        this.display = 'none';
        // button.classList.remove("hidden");
    }
}

  ngOnInit(): void {
    this.getEvents();
    this.eventForm = new FormGroup({
      eventName: new FormControl('', Validators.required),
      startDate: new FormControl('', [Validators.required, Validators.required]),
      endDate: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required)
    });
  }

  private getEvents() {
    this.eventService.getAllEvents().subscribe(data => {
      this.results = data;

      this.isError = false;
      console.log(this.results);
      // this.router.navigateByUrl('/myorders');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

  deleteEventById(eventId: number) {
    this.eventService.deleteEventById(eventId).subscribe(res => {
      this.results = this.results.filter(item => item.eventId !== eventId);
      console.log('Event deleted successfully!');
 })
  }

  updateEvent(eventId: number) {
    console.log(eventId);
    this.event.eventName = this.eventForm.get('eventName').value;
    this.event.description = this.eventForm.get('description').value;
    this.event.endDate = this.eventForm.get('endDate').value;
    this.event.deadline = this.eventForm.get('startDate').value;
    this.event.image = this.eventForm.get('image').value;
    this.event.volunteeringCategory = 0;
    this.event.region = this.region;
    this.event.location = this.eventForm.get('location').value;
    this.event.eventId = eventId;
    this.eventService.updateEvent(this.event)
      .subscribe(data => {
        this.router.navigate(['/admin'],
          { queryParams: { registered: 'true' } });
          Swal.fire('Event updated successfully!', 'Check it out', 'success').then((result) => {
            location.reload();
          });
      }
      , error => {
        console.log(error);
        this.toastr.error('Event creating failed! Please try again');
      });

  }

  selectChangeHandler (event: any) {
    this.region = event.target.value;
  }

}
