import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Result } from 'src/app/model/event-result.payload';
import { EventService } from 'src/app/services/event.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { OrganizationRequest } from '../organization-create/organization-signup/organization-request.payload';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: Observable<Body>;
  results: Result[];
  isError: boolean;
  organization: OrganizationRequest;
  organizationName: string;
  categories: Array<any>;
  categoryName: string;
  categoryNames: Array<any>;
  constructor(private eventService: EventService, private router: Router, private organizationService: OrganizationService) { }

  ngOnInit(): void {
  //   this.eventService.getAllEvents().subscribe(response => {
  //     this.events = response.data;
  // });
  // console.log(this.events);
  // this.results = this.events;
  this.categories = [
    { item_id: 0, item_text: 'None' },
    { item_id: 1, item_text: 'Medicine' },
    { item_id: 2, item_text: 'Ecology' },
    { item_id: 3, item_text: 'Social' },
    { item_id: 4, item_text: 'Media' },
    { item_id: 5, item_text: 'Event' },
    { item_id: 6, item_text: 'Animal ' },
    { item_id: 7, item_text: 'Emergency' },
    { item_id: 8, item_text: 'Culture' },
    { item_id: 9, item_text: 'Donation' },
    { item_id: 10, item_text: 'Pro_bono' },
    { item_id: 11, item_text: 'Corporate' },
    { item_id: 12, item_text: 'Online' },
    { item_id: 13, item_text: 'Ethno' },
    { item_id: 14, item_text: 'Sport' }
];
  this.getEvents();
  }

  private getEvents() {
    this.eventService.getAllEvents().subscribe(data => {
      this.results = data;
      // this.organization =  this.getOrganizationById(data.organizationId);
      for(var i = 0; i<data.length; i++) {
        this.organization =  this.getOrganizationById(data[i].organizationId);
      }

      this.isError = false;
      console.log(this.results);
      // this.router.navigateByUrl('/myorders');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }


  private getCategory(id_field: number) : string {
    this.categoryName = this.categories.find(i => i.item_id === id_field).item_text;
    return this.categoryName;
  }

  goToEvent(id: number): void {
    this.router.navigateByUrl('/event/' + id);
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
}
