import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  upload(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${environment.api_url}images/upload`, formData, {responseType: 'text'});
  }

  delete(file: any): Observable<any> {
    return this.http.delete(`${environment.api_url}images/delete`, file);
  }

  get(file: string): Observable<string> {
    return this.http.post(`${environment.api_url}images`, file, {responseType: 'text'});
  }
}
