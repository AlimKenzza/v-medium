import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventRequestForCreate } from 'src/app/model/event-create-request.payload';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  event: EventRequestForCreate;
  eventForm: FormGroup;
  region: number;
  constructor(private eventService: EventService, private router: Router, private toastr: ToastrService) { 
    this.event =  {
    location: '',
    region: 0,
    image: '',
    description: '',
    deadline: '',
    endDate: '',
    eventName: '',
    volunteeringCategory: 0
    };
  }

  ngOnInit() {
    this.eventForm = new FormGroup({
      eventName: new FormControl('', Validators.required),
      startDate: new FormControl('', [Validators.required, Validators.required]),
      endDate: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required)
    });
  }
  createEvent() {
    this.event.eventName = this.eventForm.get('eventName').value;
    this.event.description = this.eventForm.get('description').value;
    this.event.endDate = this.eventForm.get('endDate').value;
    this.event.deadline = this.eventForm.get('startDate').value;
    this.event.image = this.eventForm.get('image').value;
    this.event.volunteeringCategory = 0;
    this.event.region = this.region;
    this.event.location = this.eventForm.get('location').value;
    this.eventService.createEvent(this.event)
      .subscribe(data => {
        this.router.navigate(['/company-events'],
          { queryParams: { registered: 'true' } });
          Swal.fire('Event created successfully!', 'Check it out', 'success').then((result) => {
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
