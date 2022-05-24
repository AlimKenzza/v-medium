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

  constructor(private orgService: OrganizationService, private router: Router) { }

  ngOnInit(): void {
    this.getEvents();
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
  goToEvent(id: number): void {
    this.router.navigateByUrl('/event/' + id);
  }
}
