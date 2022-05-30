import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

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
}
