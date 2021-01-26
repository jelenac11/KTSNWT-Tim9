import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewsPage } from '../models/response/news-page.model';
import { News } from '../models/response/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient
  ) { }

  getAll(size: number, page: number): Observable<NewsPage>{
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}news/by-page`, { params, responseType: 'json' });
  }

  get(slug: number): Observable<News> {
    return this.http.get(`${environment.api_url}news/${slug}`, {responseType: 'json'});
  }

  post(body: News): Observable<News> {
    return this.http.post(`${environment.api_url}news`, body, {headers: this.headers, responseType: 'json'});
  }

  put(slug: number, body: News): Observable<News> {
    return this.http.put(`${environment.api_url}news/${slug}`, body, {headers: this.headers, responseType: 'json'});
  }

  delete(slug: number): Observable<string> {
    return this.http.delete(`${environment.api_url}news/${slug}`, {responseType: 'text'});
  }

  subscribe(userId: string, coID: string): Observable<string> {
    return this.http.put<string>(`${environment.api_url}news/subscribe/${userId}/${coID}`, {responseType: 'json' });
  }

  unsubscribe(userId: string, coID: string): Observable<string> {
    return this.http.put<string>(`${environment.api_url}news/unsubscribe/${userId}/${coID}`, {responseType: 'text' });
  }

  getAllByCOID(coid: number, size: number, page: number): Observable<NewsPage>{
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}news/${coid}/by-page`, { params, responseType: 'json' });
  }

  getSubscribedNews(size: number, page: number, userId: string): Observable<NewsPage>{
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}news/subscribed-news/${userId}`, { params, responseType: 'json' });
  }

  getAllByCategoryId(size: number, page: number, userId: string, categoryId: string): Observable<NewsPage>{
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}news/subscribed-news/${userId}/${categoryId}`,
      { params, headers: this.headers, responseType: 'json' });
  }
}
