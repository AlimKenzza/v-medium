import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/shared/auth.service';
import { Body } from '../model/event-response.payload';
import { Result } from '../model/event-result.payload';

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
}
