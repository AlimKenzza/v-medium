import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { EventRequestForCreate } from 'src/app/model/event-create-request.payload';
import { Body } from 'src/app/model/event-response.payload';
import { Result } from 'src/app/model/event-result.payload';
import { EventUpdate } from 'src/app/model/event-update-request.payload';
import { OrganizationListRequest } from 'src/app/model/organization-getlist.payload';
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
  results: OrganizationListRequest[];
  event: EventUpdate;
  eventForm: FormGroup;
  isError: boolean;
  organization: OrganizationRequest;
  display ='none';
  region: number;
  organizations: OrganizationListRequest[];
  eventCount: number;

  constructor(private eventService: EventService, private router: Router, private organizationService: OrganizationService, private toastr: ToastrService) { 
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
    this.getOrganizations();
  }

  deleteOrganizationById(organizationId: number) {
    console.log(organizationId);
    this.organizationService.deleteOrganizationById(organizationId).subscribe(res => {
      this.results = this.results.filter(item => item.organizationId !== organizationId);
      console.log('Organization deleted successfully!');
 })
 location.reload();
  }

  private getOrganizations() {
    this.organizationService.getOrganizationsList().subscribe(data => {
      this.organizations = data;
      this.eventCount = this.organizations.length;
      this.isError = false;
      console.log(this.organizations);
      // this.router.navigateByUrl('/myorders');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

  selectChangeHandler (event: any) {
    this.region = event.target.value;
  }

}
