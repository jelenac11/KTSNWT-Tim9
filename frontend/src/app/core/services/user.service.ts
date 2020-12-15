import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/response/user.model';
import { environment } from 'src/environments/environment';
import { UserRequest } from '../models/request/user-request.model';

@Injectable()
export class UserService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient
  ) { }

  signup(body: UserRequest): Observable<User> {
    return this.http.post(`${environment.auth_url}sign-up`, body, {headers: this.headers, responseType: 'json'});
  }

}
