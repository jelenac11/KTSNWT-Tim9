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
  constructor(
    private http: HttpClient
  ) { }

  getAll(size: number, page: number): Observable<NewsPage>{
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}news/by-page`, { params });
  }

  get(slug: any): Observable<News> {
    return this.http.get(`${environment.api_url}news/${slug}`);
  }

  post(body: any): Observable<News> {
    return this.http.post(`${environment.api_url}news`, body);
  }

  put(slug: any, body: any): Observable<News> {
    return this.http.put(`${environment.api_url}news/${slug}`, body);
  }

  delete(slug: any): Observable<string> {
    return this.http.delete<string>(`${environment.api_url}news/${slug}`);
  }

  subscribe(userId: string, coID: string): Observable<string> {
    return this.http.put<string>(`${environment.api_url}news/subscribe/${userId}/${coID}`, { responseType: 'json' });
  }

  unsubscribe(userId: string, coID: string): Observable<string> {
    return this.http.put<string>(`${environment.api_url}news/unsubscribe/${userId}/${coID}`, { responseType: 'json' });
  }

  getAllByCOID(coid: number, size: number, page: number): Observable<NewsPage>{
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}news/${coid}/by-page`, { params });
  }

  getSubscribedNews(size: number, page: number, userId: string): Observable<NewsPage>{
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}news/subscribed-news/${userId}`, { responseType: 'json' });
  }
}
