import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/shared/auth.service';
import { MembershipValidate } from '../model/membership-validate.payload';
import { VolunteerResponse } from './volunteer-response.payload';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  listingdata:Array<any> = [];
  arrLength : number;
  volunteers: VolunteerResponse[];

  constructor(private authService: AuthService, private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  requestMembership(organizationId: number){
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + 
       this.authService.getJwtToken()
    );
    return this.httpClient.post('https://localhost:5001/api/Membership/request-membership' , {organizationId:organizationId}, {headers:header})
    .pipe(map(data => {
      return true;
    }));
  }

  validateMembership(){
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + 
       this.authService.getJwtToken()
    );
    return this.httpClient.get<MembershipValidate>('https://localhost:5001/api/Membership/list/volunteer/memberships?Skip=0&Take=7' , {headers:header})
    .pipe(map(data => {
      this.localStorage.store('total', data.total);
      return true;
    }));
  }

  getOrganizationCandidatesList(): Observable<VolunteerResponse[]> {
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + 
       this.authService.getJwtToken()
    );
    return this.httpClient.get('https://localhost:5001/api/Membership/organization/candidates?Skip=0&Take=7', {observe: 'response', headers: header}).
    pipe(map(response => {
      this.arrLength = Object.values(response.body)[1].length;
      for(let volunteer = 0; volunteer < this.arrLength; volunteer++) {
     
        this.volunteers = Object.values(response.body)[1][volunteer];
        this.listingdata.push(this.volunteers);
      
       }
      return this.listingdata;
    }));
  }
}
