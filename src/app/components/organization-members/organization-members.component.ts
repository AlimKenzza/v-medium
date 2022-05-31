import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { MembershipService } from 'src/app/services/membership.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { VolunteerResponse } from 'src/app/services/volunteer-response.payload';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organization-members',
  templateUrl: './organization-members.component.html',
  styleUrls: ['./organization-members.component.css']
})
export class OrganizationMembersComponent implements OnInit {
  results: VolunteerResponse[];
  isError: boolean;
  membersCount: number;

  constructor(private companyService: OrganizationService, private memberService: MembershipService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMembers();
  }

  private getMembers() {
    this.companyService.getOrganizationMembersList().subscribe(data => {
      this.results = data;
      this.isError = false;
      console.log(this.results);
      this.membersCount = this.results.length;
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

  kick(volunteerId: number) {
    this.memberService.kickVolunteer(volunteerId)
    .subscribe(data => {
      this.router.navigate(['/company-members']);
        Swal.fire('Member removed successfully!', 'Check out your members', 'success').then((result) => {
          location.reload();
        });
    }
    , error => {
      console.log(error);
      this.toastr.error('Request failed! Please try again');
    });
  }

}
