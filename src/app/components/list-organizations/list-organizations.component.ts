import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { OrganizationListRequest } from 'src/app/model/organization-getlist.payload';
import { OrganizationService } from 'src/app/services/organization.service';
import { OrganizationRequest } from '../organization-create/organization-signup/organization-request.payload';

@Component({
  selector: 'app-list-organizations',
  templateUrl: './list-organizations.component.html',
  styleUrls: ['./list-organizations.component.css']
})
export class ListOrganizationsComponent implements OnInit {
  organizations: OrganizationListRequest[];
  isError: boolean;
  constructor(private orgService: OrganizationService, private router: Router) { }

  ngOnInit(): void {
    this.getOrganizations();
  }

  private getOrganizations() {
    this.orgService.getOrganizationsList().subscribe(data => {
      this.organizations = data;
      this.isError = false;
      console.log(this.organizations);
      // this.router.navigateByUrl('/myorders');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

  goToOrganization(id: number): void {
    this.router.navigateByUrl('/organization/' + id);
  }

}
