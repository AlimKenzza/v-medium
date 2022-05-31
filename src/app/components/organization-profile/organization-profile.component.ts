import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Result } from 'src/app/model/event-result.payload';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit {
  results: Result[];
  isError: boolean;
  categories: Array<any> = [];
  categoryName: string;

  constructor(private orgService: OrganizationService, private router: Router) { }

  ngOnInit(): void {
    this.getEvents();
    this.categories = [
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
  }

  private getEvents() {
    this.orgService.getOrganizationEventList().subscribe(data => {
      this.results = data;
      this.isError = false;
      for(var i = 0; i < data.length; i++) {
        this.categoryName = this.getCategory(data[i].volunteeringCategory);
      }
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

  getCategory(id_field: number) : string {
    var categoryName = this.categories.find(i => i.item_id === id_field).item_text;
    return categoryName;
  }
}
