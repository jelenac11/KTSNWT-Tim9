import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/response/category.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CategoryService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.api_url}categories`, { headers: this.headers });
  }
}
