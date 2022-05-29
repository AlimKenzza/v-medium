import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { OrganizationService } from 'src/app/services/organization.service';
import { VolunteerResponse } from 'src/app/services/volunteer-response.payload';

@Component({
  selector: 'app-list-volunteers',
  templateUrl: './list-volunteers.component.html',
  styleUrls: ['./list-volunteers.component.css']
})
export class ListVolunteersComponent implements OnInit {

  volunteers: VolunteerResponse[];
  isError: boolean;

  constructor(private orgService: OrganizationService) { }

  ngOnInit(): void {
    this.getVolunteers();
  }

  private getVolunteers() {
    this.orgService.getVolunteersList().subscribe(data => {
      this.volunteers = data;
      this.isError = false;
      console.log(this.volunteers);
      // this.router.navigateByUrl('/myorders');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

}
