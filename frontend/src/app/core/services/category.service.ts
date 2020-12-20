import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/response/category.model';
import { ApiService } from './api.service';

@Injectable()
export class CategoryService {

  constructor(
    private apiService: ApiService
  ) { }

  getAll(): Observable<Category[]> {
    return this.apiService.get('categories');
  }
}
