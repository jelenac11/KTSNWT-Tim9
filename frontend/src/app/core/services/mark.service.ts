import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MarkRequest } from '../models/request/mark-request.model';
import { Mark } from '../models/response/mark.model';

@Injectable({
  providedIn: 'root'
})
export class MarkService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient
  ) { }

  get(value: number): Observable<Mark> {
    return this.http.get(`${environment.api_url}marks/${value}`, {responseType: 'json'});
  }

  create(mark: MarkRequest): Observable<Mark> {
    return this.http.post(`${environment.api_url}marks/rate`, mark, {headers: this.headers, responseType: 'json'});
  }

  update(mark: MarkRequest): Observable<Mark> {
    return this.http.put(`${environment.api_url}marks`, mark, {headers: this.headers, responseType: 'json'});
  }

}
