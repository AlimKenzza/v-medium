import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupRequestPayload } from '../signup-new/signup-request.payload';
import { Observable, throwError } from 'rxjs';
import { SignupResponsePayload } from '../signup-new/signup-response.payload';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LoginRequestPayload } from '../login/login/login-request.payload';
import { LoginResponse } from '../login/login/login-response.payload';
import { ProfilePayload } from './profile-response.payload';
import { CookieService } from 'ngx-cookie-service';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken()
  }


  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService, private cookieService: CookieService) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post<SignupResponsePayload>('https://localhost:5001/api/Auth/register', signupRequestPayload)
    .pipe(map(data => {
      // this.localStorage.store('firstName', data.firstName);
      // this.localStorage.store('email', data.email)
      // this.localStorage.store('phoneNumber', data.phone)
      // this.localStorage.store('lastName', data.lastName)
      // this.localStorage.store('role', data.role)
      // this.loggedIn.emit(true);
      return true;
    }));
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<any> {
    return this.httpClient.post<LoginResponse>('https://localhost:5001/api/Auth/login', loginRequestPayload)
    .pipe(map(data => {
      this.localStorage.store('authenticationToken', data.accessToken);
      this.cookieService.set( 'refreshToken', data.refreshToken );
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('username', loginRequestPayload.login);
      this.loggedIn.emit(true);
      this.username.emit(loginRequestPayload.login);
      return true;
    }));
  }

  logout(token: string) {
    const headers = new HttpHeaders().set('Content-Type','application/json-patch+json');
    this.httpClient.post('https://localhost:5001/api/Auth/revoke', token, {headers:headers})
      .subscribe(data => {
      }, error => {
        throwError(error);
      });
  }


  userProfile(): Observable<ProfilePayload> {
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + 
       this.getJwtToken()
    );
    return this.httpClient.get<ProfilePayload>("https://localhost:5001/api/Users/profile", {headers:header});
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>('https://localhost:5001/api/Auth/refresh',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('refreshToken');
        this.localStorage.store('authenticationToken',
          response.accessToken);
        this.localStorage.store('refreshToken', response.refreshToken);
      }));
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getRefreshTokenFromCookies() {
    return this.cookieService.get('refreshToken');
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }





}
