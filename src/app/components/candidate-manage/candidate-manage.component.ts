import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { MembershipService } from 'src/app/services/membership.service';
import { VolunteerResponse } from 'src/app/services/volunteer-response.payload';

@Component({
  selector: 'app-candidate-manage',
  templateUrl: './candidate-manage.component.html',
  styleUrls: ['./candidate-manage.component.css']
})
export class CandidateManageComponent implements OnInit {
  results: VolunteerResponse[];
  isError: boolean;
  candidateCount: number;

  constructor(private memberService: MembershipService) { }

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

}
