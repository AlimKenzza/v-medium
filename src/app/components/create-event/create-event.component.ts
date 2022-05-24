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
  constructor(private eventService: EventService, private router: Router, private toastr: ToastrService) { 
    this.event =  {
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
      description: new FormControl('', Validators.required)
    });
  }
  createEvent() {
    this.event.eventName = this.eventForm.get('eventName').value;
    this.event.description = this.eventForm.get('description').value;
    this.event.endDate = this.eventForm.get('endDate').value;
    this.event.deadline = this.eventForm.get('startDate').value;
    this.event.volunteeringCategory = 0;
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
}
