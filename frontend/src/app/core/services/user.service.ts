import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/response/user.model';
import { environment } from 'src/environments/environment';
import { UserRequest } from '../models/request/user-request.model';
import { UserPage } from '../models/response/user-page.model';
import { AdminRequest } from '../models/request/admin-request.model';

@Injectable()
export class UserService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }

  signup(body: UserRequest): Observable<User> {
    return this.http.post(`${environment.auth_url}sign-up`, body, { headers: this.headers, responseType: 'json' });
  }

  getCurrentUser(): Observable<User> {
    return this.http.get(`${environment.auth_url}current-user`, { responseType: 'json' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${environment.api_url}admins/${id}`, { responseType: 'text' });
  }

  changeProfile(body: UserRequest): Observable<User> {
    return this.http.put(`${environment.api_url}users/change-profile`, body, { headers: this.headers, responseType: 'json' });
  }

  getUsers(size: number, page: number, user: string): Observable<UserPage> {
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}${user}/by-page`, { params, responseType: 'json' });
  }

  searchUsers(size: number, page: number, value: string, user: string): Observable<UserPage> {
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}${user}/search/${value}`, { params, responseType: 'json' });
  }

  addAdmin(admin: AdminRequest): Observable<User> {
    return this.http.post(`${environment.api_url}admins`, admin, { headers: this.headers, responseType: 'json' });
  }

  isSubscribed(email: string, culturalOfferId: number): Observable<boolean> {
    return this.http.post<boolean>(`${environment.api_url}registered-users/is-subscibed/${email}/${culturalOfferId}`,
    { responseType: 'json' });
  }
}
