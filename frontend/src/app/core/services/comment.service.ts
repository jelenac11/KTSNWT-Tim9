import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentPage } from '../models/response/comment-page.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getCommentsByCulturalOfferId(size: number, page: number, id: number): Observable<CommentPage> {
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}comments/cultural-offer/${id}`, {responseType: 'json'});
  }


}
