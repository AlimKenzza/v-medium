import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/shared/auth.service';
import { Organization } from '../components/organization-create/organization-request.payload';
import { OrganizationRequest } from '../components/organization-create/organization-signup/organization-request.payload';
import { Result } from '../model/event-result.payload';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  listingdata:Array<any> = [];
  arrLength : number;
  events: Result[];

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
      this.localStorage.store('ceo', data.ceo);
      this.localStorage.store('location', data.location);
      return true;
    }));
  }

  getOrganizationInfo(): Observable<any> {
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + 
       this.authService.getJwtToken()
    );
    console.log(header);
    return this.httpClient.get<OrganizationRequest>('https://localhost:5001/api/Organizations/organization/userId',  {headers:header})
    .pipe(map(data => {
      this.localStorage.store('categories', data.volunteeringCategories);
      this.localStorage.store('region', data.region);
      this.localStorage.store('experience', data.experience);
      this.localStorage.store('description', data.description);
      this.localStorage.store('birthdate', data.organizedDate);
      this.localStorage.store('organizationName', data.organizationName);
      this.localStorage.store('organizationTypes', data.organizationTypes);
      this.localStorage.store('ceo', data.ceo);
      this.localStorage.store('location', data.location);
      return true;
    }));
  }

  getOrganizationEventList(): Observable<Result[]> {
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + 
       this.authService.getJwtToken()
    );
    console.log(header);
    return this.httpClient.get('https://localhost:5001/api/Events/list/organization?Skip=0&Take=7', {observe: 'response', headers: header}).
    pipe(map(response => {
      this.arrLength = Object.values(response.body)[1].length;
      for(let event = 0; event < this.arrLength; event++) {
     
        this.events = Object.values(response.body)[1][event];
        this.listingdata.push(this.events);
      
       }
      return this.listingdata;
    }));
  }

  getOrganizationById(id: number):Observable<OrganizationRequest> {
    return this.httpClient.get<OrganizationRequest>('https://localhost:5001/api/Organizations?id=' + id);
  }
}
