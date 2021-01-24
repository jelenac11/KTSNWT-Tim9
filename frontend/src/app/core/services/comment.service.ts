import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentPage } from '../models/response/comment-page.model';
import { Comment } from '../models/response/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) { }

  getCommentsByCulturalOfferId(size: number, page: number, id: number): Observable<CommentPage> {
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}comments/cultural-offer/${id}`, {responseType: 'json'});
  }

  post(body: FormData): Observable<Comment> {
    return this.http.post(`${environment.api_url}comments`, body, {responseType: 'json'});
  }

  approve(comment: Comment, approve: boolean): Observable<string> {
    if (approve) {
      return this.http.get(`${environment.api_url}comments/approve/${comment.id}`, {responseType: 'text'});
    }
    return this.http.get(`${environment.api_url}comments/decline/${comment.id}`, {responseType: 'text'});
  }

  getNotApprovedComments(size: number, page: number): Observable<CommentPage> {
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}comments/not-approved-comments`, {responseType: 'json'});
  }

}
