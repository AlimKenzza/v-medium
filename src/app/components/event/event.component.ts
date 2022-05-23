import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Result } from 'src/app/model/event-result.payload';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: Observable<Body>;
  results: Result[];
  isError: boolean;
  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
  //   this.eventService.getAllEvents().subscribe(response => {
  //     this.events = response.data;
  // });
  // console.log(this.events);
  // this.results = this.events;
  this.getEvents();
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

  goToEvent(id: number): void {
    this.router.navigateByUrl('/event/' + id);
  }

}
