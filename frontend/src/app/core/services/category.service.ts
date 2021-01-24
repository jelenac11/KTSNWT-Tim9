import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/response/category.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CategoryPage } from '../models/response/category-page.model';

@Injectable()
export class CategoryService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private headersText = new HttpHeaders({ 'Content-Type': 'text/plain; charset=UTF-8' });

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.api_url}categories`, {responseType: 'json' });
  }

  getAllPages(size: number, page: number): Observable<CategoryPage>{
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}categories/by-page`, { params, responseType: 'json' });
  }

  get(slug: number): Observable<Category> {
    return this.http.get(`${environment.api_url}categories/${slug}`, {responseType: 'json'});
  }

  post(body: Category): Observable<Category> {
    return this.http.post(`${environment.api_url}categories`, body, {headers: this.headers, responseType: 'json'});
  }

  put(slug: number, body: Category): Observable<Category> {
    return this.http.put(`${environment.api_url}categories/${slug}`, body, {headers: this.headers, responseType: 'json'});
  }

  delete(slug: number): Observable<string> {
    return this.http.delete(`${environment.api_url}categories/${slug}`, {responseType: 'text'});
  }

  getAllPagesByName(size: number, page: number, value: string): Observable<CategoryPage>{
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}categories/by-page/${value}`, { params, responseType: 'json' });
  }
}
