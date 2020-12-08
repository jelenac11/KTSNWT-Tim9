import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CulturalOffer } from '../models/cultural-offer.model';
import { ApiService } from './api.service';

@Injectable()
export class CulturalOfferService {

  constructor(
    private apiService: ApiService
  ) { }

  get(slug: any): Observable<CulturalOffer> {
    return this.apiService.get(`cultural-offers/${slug}`);
  }

  getCulturalOffersByCategory(slug: any, size: number, page: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.apiService.get(`cultural-offers/category/${slug}`, params);
  }

  findByCategoryIdAndName(slug: any, name: string, size: number, page: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.apiService.get(`cultural-offers/category/${slug}/find-by-name/${name}`, params)
  }

  post(body: CulturalOffer): Observable<CulturalOffer> {
    return this.apiService.post('cultural-offers', body);
  }

  put(slug: any, body: CulturalOffer): Observable<CulturalOffer> {
    return this.apiService.put(`cultural-offers/${slug}`, body)
  }

  delete(slug: any): Observable<any> {
    return this.apiService.delete(`cultural-offers/${slug}`);
  }
}
