import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/shared/auth.service';
import { MembershipValidate } from '../model/membership-validate.payload';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

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
}
