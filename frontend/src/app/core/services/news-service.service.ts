import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }

  subscribe(userId: string, coID: string): Observable<string> {
    return this.http.put<string>(`${environment.api_url}news/subscribe/${userId}/${coID}`, { responseType: 'json' });
  }
  unsubscribe(userId: string, coID: string): Observable<string> {
    return this.http.put<string>(`${environment.api_url}news/unsubscribe/${userId}/${coID}`, { responseType: 'json' });
  }
}
