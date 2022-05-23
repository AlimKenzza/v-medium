import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/shared/auth.service';
import { Organization } from '../components/organization-create/organization-request.payload';
import { OrganizationRequest } from '../components/organization-create/organization-signup/organization-request.payload';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private httpClient: HttpClient, private authService: AuthService, private localStorage: LocalStorageService) { }


  createOrganizationProfile(organization: Organization): Observable<any> {
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + 
       this.authService.getJwtToken()
    );
    return this.httpClient.post<OrganizationRequest>('https://localhost:5001/api/Organizations/organization-register', organization, {headers:header})
    .pipe(map(data => {
      this.localStorage.store('categories', data.volunteeringCategories);
      this.localStorage.store('region', data.region);
      this.localStorage.store('experience', data.experience);
      this.localStorage.store('description', data.description);
      this.localStorage.store('birthdate', data.organizedDate);
      this.localStorage.store('organizationName', data.organizationName);
      this.localStorage.store('organizationTypes', data.organizationTypes);
      return true;
    }));
  }
}
