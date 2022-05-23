import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/shared/auth.service';
import { Volunteer } from '../components/profile/profile/volunteer-request.payload';
import { VolunteerResponse } from './volunteer-response.payload';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  constructor(private httpClient: HttpClient, private authService: AuthService, private localStorage: LocalStorageService) { }

  createVolunteerProfile(volunteer: Volunteer): Observable<any> {
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + 
       this.authService.getJwtToken()
    );
    return this.httpClient.post<VolunteerResponse>('https://localhost:5001/api/Volunteers/volunteer-register', volunteer, {headers:header})
    .pipe(map(data => {
      this.localStorage.store('categories', data.volunteeringCategories);
      this.localStorage.store('region', data.region);
      this.localStorage.store('experience', data.experience);
      this.localStorage.store('description', data.description);
      this.localStorage.store('birthdate', data.birthDate);
      if(data.sex == true) {
        this.localStorage.store('gender', "male");
      }
      this.localStorage.store('gender', "female");
      return true;
    }));
  }
}
