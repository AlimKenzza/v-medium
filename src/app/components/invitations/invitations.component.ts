import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { MembershipRespone } from 'src/app/model/membership-response.payload';
import { OrganizationListRequest } from 'src/app/model/organization-getlist.payload';
import { MembershipService } from 'src/app/services/membership.service';
import { OrganizationService } from 'src/app/services/organization.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {
  results: MembershipRespone[];
  isError: boolean;
  organization: OrganizationListRequest;
  invitationsCount: number;

  constructor(private memberService: MembershipService, private router: Router, private toastr: ToastrService,
    private companyService: OrganizationService) { }

  ngOnInit(): void {
    this.getInvitations();
  }

  private getInvitations() {
    this.memberService.getInvitationsListForVolunteer().subscribe(data => {
      this.results = data;
      this.isError = false;
      this.companyService.getOrganizationById(data[0].organizationId).subscribe(data => {
        this.organization = data;
      }, error => {
          throwError(error);
        });
      console.log(this.results);
      
      this.invitationsCount = this.results.length;
      // this.router.navigateByUrl('/myorders');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

  acceptOrganization(volunteerId: number) {
    console.log(volunteerId);
    this.memberService.acceptOrganization(volunteerId)
    .subscribe(data => {
      this.router.navigate(['/invitations']);
        Swal.fire('Joined organization successfully!', 'Be ready', 'success').then((result) => {
          location.reload();
        });
    }
    , error => {
      console.log(error);
      this.toastr.error('Request failed! Please try again');
    });
  }

  reject(volunteerId: number) {

  }

}
