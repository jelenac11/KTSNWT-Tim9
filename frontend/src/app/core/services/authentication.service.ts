import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PasswordChangeRequest } from '../models/request/password-change-request.model';
import { UserLogin } from '../models/request/user-login-request.models';
import { UserTokenState } from '../models/response/user-token-state.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  confirmRegistration(token: string): Observable<string> {
    return this.http.get(`${environment.auth_url}confirm-registration/${token}`, {responseType: 'text'});
  }

  login(user: UserLogin): Observable<UserTokenState> {
    return this.http.post(`${environment.auth_url}login`, user, {headers: this.headers, responseType: 'json'});
  }

  logout(): void {
    this.jwtService.destroyToken();
  }

  forgotPassword(email: string): Observable<string> {
    return this.http.post(`${environment.auth_url}forgot-password`, { email }, {headers: this.headers, responseType: 'text'});
  }

  changePassword(password: PasswordChangeRequest): Observable<string> {
    return this.http.post(`${environment.auth_url}change-password`, password, {headers: this.headers, responseType: 'text'});
  }

  isAuthenticated(): boolean {
    if (!this.jwtService.getToken()) {
      return false;
    }
    return true;
  }

  getRole(): string {
    return this.jwtService.getRole();
  }

}
