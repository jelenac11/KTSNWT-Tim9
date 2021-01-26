import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.post(`${environment.api_url}images/upload`, formData, { responseType: 'text' });
  }

  uploads(files: File[]): Observable<string[]> {
    const formData = new FormData();
    for (const file of files) {
      formData.append('file', file);
    }
    return this.http.post<string[]>(`${environment.api_url}images/uploads`, formData, { responseType: 'json' });
  }

  delete(file: string): Observable<string> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      }),
      body: file
    };
    return this.http.delete<string>(`${environment.api_url}images/delete`, options);
  }

  get(file: string): Observable<string> {
    return this.http.post(`${environment.api_url}images`, file, {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      }),
      responseType: 'text'
    });
  }
}
