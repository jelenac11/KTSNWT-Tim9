import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CulturalOffer } from '../models/response/cultural-offer.model';
import { ApiService } from './api.service';
import { CulturalOfferPage } from '../models/response/cultural-offer-page.model';

@Injectable()
export class CulturalOfferService {

  constructor(
    private apiService: ApiService
  ) { }

  getAll(size: number, page: number): Observable<CulturalOfferPage> {
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.apiService.get('cultural-offers/by-page', params);
  }

  get(slug: any): Observable<CulturalOffer> {
    return this.apiService.get(`cultural-offers/${slug}`);
  }

  getCulturalOffersByCategory(slug: any, size: number, page: number): Observable<CulturalOfferPage> {
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.apiService.get(`cultural-offers/category/${slug}`, params);
  }

  findByCategoryIdAndName(slug: any, name: string, size: number, page: number): Observable<CulturalOfferPage> {
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.apiService.get(`cultural-offers/category/${slug}/find-by-name/${name}`, params)
  }

  findByName(name: string, size: number, page: number): Observable<CulturalOfferPage> {
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.apiService.get(`cultural-offers/find-by-name/${name}`, params)
  }

  post(body: any): Observable<CulturalOffer> {
    return this.apiService.post('cultural-offers', body);
  }

  put(slug: any, body: any): Observable<CulturalOffer> {
    return this.apiService.put(`cultural-offers/${slug}`, body)
  }

  delete(slug: any): Observable<boolean> {
    return this.apiService.delete(`cultural-offers/${slug}`);
  }

}
