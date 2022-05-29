import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { Result } from 'src/app/model/event-result.payload';
import { EventUpdate } from 'src/app/model/event-update-request.payload';
import { EventService } from 'src/app/services/event.service';
import { OrganizationService } from 'src/app/services/organization.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-crud',
  templateUrl: './company-crud.component.html',
  styleUrls: ['./company-crud.component.css']
})
export class CompanyCrudComponent implements OnInit {
  results: Result[];
  isError: boolean;
  event: EventUpdate;
  display ='none';
  eventForm: FormGroup;
  region: number;
  id: number;

  constructor(private orgService: OrganizationService, private toastr: ToastrService, private eventService: EventService, private router: Router) {
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

  public modalHandler(val: boolean, eventId: number) {
    console.log(eventId);
    if (val) {
      
        this.display = 'block';
      
        this.id = eventId;
        // button.classList.add("hidden");
    } else {
        this.display = 'none';
        // button.classList.remove("hidden");
    }
}

  private getEvents() {
    this.orgService.getOrganizationEventList().subscribe(data => {
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

  updateEvent() {
    this.event.eventName = this.eventForm.get('eventName').value;
    this.event.description = this.eventForm.get('description').value;
    this.event.endDate = this.eventForm.get('endDate').value;
    this.event.deadline = this.eventForm.get('startDate').value;
    this.event.image = this.eventForm.get('image').value;
    this.event.volunteeringCategory = 0;
    this.event.region = this.region;
    this.event.location = this.eventForm.get('location').value;
    this.event.eventId = this.id;
    this.eventService.updateEvent(this.event)
      .subscribe(data => {
        this.router.navigate(['/company-crud'],
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


}
