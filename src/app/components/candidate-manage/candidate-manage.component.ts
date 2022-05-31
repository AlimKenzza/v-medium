import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { MembershipService } from 'src/app/services/membership.service';
import { VolunteerResponse } from 'src/app/services/volunteer-response.payload';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidate-manage',
  templateUrl: './candidate-manage.component.html',
  styleUrls: ['./candidate-manage.component.css']
})
export class CandidateManageComponent implements OnInit {
  results: VolunteerResponse[];
  isError: boolean;
  candidateCount: number;

  constructor(private memberService: MembershipService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCandidates();
  }

  private getCandidates() {
    this.memberService.getOrganizationCandidatesList().subscribe(data => {
      this.results = data;
      this.isError = false;
      console.log(this.results);
      this.candidateCount = this.results.length;
      // this.router.navigateByUrl('/myorders');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

  reject(volunteerId: number) {

  }

  accept(volunteerId: number) {
    this.memberService.acceptVolunteer(volunteerId)
    .subscribe(data => {
      this.router.navigate(['/company-candidates']);
        Swal.fire('Candidate has been accepted successfully!', 'Check out your members', 'success').then((result) => {
          location.reload();
        });
    }
    , error => {
      console.log(error);
      this.toastr.error('Request failed! Please try again');
    });
  }

}
