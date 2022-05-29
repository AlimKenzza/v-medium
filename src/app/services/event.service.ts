import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/shared/auth.service';
import { EventRequestForCreate } from '../model/event-create-request.payload';
import { Result } from '../model/event-result.payload';
import { EventUpdate } from '../model/event-update-request.payload';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  listingdata:Array<any> = [];
  arrLength : number;
  events: Result[];

  constructor(private httpClient: HttpClient, private authService: AuthService, private localStorage: LocalStorageService) {

   }


   getAllEvents(): Observable<Result[]> {
    return this.httpClient.get('https://localhost:5001/api/Events/list?Skip=0&Take=10', {observe: 'response'}).
    pipe(map(response => {
      this.arrLength = Object.values(response.body)[1].length;
      for(let event = 0; event < this.arrLength; event++) {
     
        this.events = Object.values(response.body)[1][event];
        this.listingdata.push(this.events);
      
       }
      return this.listingdata;
    }));
  }

  getEventById(id: number):Observable<Result> {
    return this.httpClient.get<Result>('https://localhost:5001/api/Events?id=' + id);
  }
  
  joinToEvent(id:number): Observable<Result> {
    console.log(this.authService.getJwtToken());
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + 
       this.authService.getJwtToken()
    );
   console.log(header);
    return this.httpClient.put<Result>('https://localhost:5001/api/Volunteers/volunteer/joinToEvent?eventId=' + id, null, {headers:header})
    .pipe(map(data => {
      // this.localStorage.store('categories', data.volunteeringCategories);
      // this.localStorage.store('region', data.region);
      // this.localStorage.store('experience', data.experience);
      // this.localStorage.store('description', data.description);
      // this.localStorage.store('birthdate', data.organizedDate);
      // this.localStorage.store('organizationName', data.organizationName);
      // this.localStorage.store('organizationTypes', data.organizationTypes);
      return data;
    }));
  }

  leaveEvent(id:number): Observable<Result> {
    console.log(this.authService.getJwtToken());
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + 
       this.authService.getJwtToken()
    );
   console.log(header);
    return this.httpClient.put<Result>('https://localhost:5001/api/Volunteers/volunteer/leaveFromEvent?eventId=' + id, null, {headers:header})
    .pipe(map(data => {
      // this.localStorage.store('categories', data.volunteeringCategories);
      // this.localStorage.store('region', data.region);
      // this.localStorage.store('experience', data.experience);
      // this.localStorage.store('description', data.description);
      // this.localStorage.store('birthdate', data.organizedDate);
      // this.localStorage.store('organizationName', data.organizationName);
      // this.localStorage.store('organizationTypes', data.organizationTypes);
      return data;
    }));
  }

  getVolunteerId() {
    return this.localStorage.retrieve('volunteerId');
  }

  getVolunteerIds() {
    return this.localStorage.retrieve('volunteerIds');
  }

  deleteEventById(eventId: number) {
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + 
       this.authService.getJwtToken()
    );
    return this.httpClient.delete('https://localhost:5001/api/Events?eventId=' + eventId, {headers:header}).pipe(
      catchError(this.errorHandler)
    );
  }
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

  createEvent(event: EventRequestForCreate): Observable<any> {
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + 
       this.authService.getJwtToken()
    );
    return this.httpClient.post<EventRequestForCreate>('https://localhost:5001/api/Events/event/create', event, {headers:header})
    .pipe(map(data => {
      return true;
    }));
  }


  updateEvent(event: EventUpdate): Observable<any> {
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + 
       this.authService.getJwtToken()
    );
    return this.httpClient.put<EventUpdate>('https://localhost:5001/api/Events/event/update', event, {headers:header})
    .pipe(map(data => {
      return true;
    }));
  }


}
