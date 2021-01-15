import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/response/category.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CategoryPage } from '../models/response/category-page.model';

@Injectable()
export class CategoryService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.api_url}categories`, { headers: this.headers });
  }

  getAllPages(size: number, page: number): Observable<CategoryPage>{
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}categories/by-page`, { params });
  }

  get(slug: any): Observable<Category> {
    return this.http.get(`${environment.api_url}categories/${slug}`);
  }

  post(body: any): Observable<Category> {
    return this.http.post(`${environment.api_url}categories`, body);
  }

  put(slug: any, body: any): Observable<Category> {
    return this.http.put(`${environment.api_url}categories/${slug}`, body);
  }

  delete(slug: any): Observable<string> {
    return this.http.delete<string>(`${environment.api_url}categories/${slug}`);
  }

}
