import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CulturalOffer } from '../models/response/cultural-offer.model';
import { CulturalOfferPage } from '../models/response/cultural-offer-page.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class CulturalOfferService {
  constructor(
    private http: HttpClient
  ) { }

  getAll(size: number, page: number): Observable<CulturalOfferPage> {
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}cultural-offers/by-page`, { params });
  }

  get(slug: string): Observable<CulturalOffer> {
    return this.http.get(`${environment.api_url}cultural-offers/${slug}`);
  }

  getCulturalOffersByCategory(slug: string, size: number, page: number): Observable<CulturalOfferPage> {
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}cultural-offers/category/${slug}`, { params });
  }

  findByCategoryIdAndName(slug: string, name: string, size: number, page: number): Observable<CulturalOfferPage> {
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}cultural-offers/category/${slug}/find-by-name/${name}`, { params });
  }

  findByName(name: string, size: number, page: number): Observable<CulturalOfferPage> {
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}cultural-offers/find-by-name/${name}`, { params });
  }

  post(body: FormData): Observable<CulturalOffer> {
    return this.http.post(`${environment.api_url}cultural-offers`, body);
  }

  put(slug: string, body: FormData): Observable<CulturalOffer> {
    return this.http.put(`${environment.api_url}cultural-offers/${slug}`, body);
  }

  delete(slug: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.api_url}cultural-offers/${slug}`);
  }

  getSubscribed(userId: string, size: number, page: number): Observable<CulturalOfferPage> {
    let params = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());
    return this.http.get(`${environment.api_url}cultural-offers/subscribed/${userId}`, { params, responseType: 'json'});
  }

}
