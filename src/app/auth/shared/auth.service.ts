import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/signup/signup-request.payload';
import { Observable } from 'rxjs';
import { SignupResponsePayload } from '../signup/signup/signup-response.payload';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LoginRequestPayload } from '../login/login/login-request.payload';
import { LoginResponse } from '../login/login/login-response.payload';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken()
  }


  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post<SignupResponsePayload>('http://localhost:5001/api/v1/account/register', signupRequestPayload)
    .pipe(map(data => {
      this.localStorage.store('name', data.body.name);
      this.localStorage.store('email', data.body.email)
      this.localStorage.store('phoneNumber', data.body.phoneNumber)
      this.localStorage.store('surname', data.body.surname)
      this.loggedIn.emit(true);
      return true;
    }));
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<any> {
    return this.httpClient.post<LoginResponse>('http://localhost:5001/api/Auth/login', loginRequestPayload)
    .pipe(map(data => {
      this.localStorage.store('authenticationToken', data.accessToken);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.loggedIn.emit(true);
      return true;
    }));
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>('http://localhost:5001/api/Auth/refresh',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');

        this.localStorage.store('authenticationToken',
          response.accessToken);
      }));
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }




}
