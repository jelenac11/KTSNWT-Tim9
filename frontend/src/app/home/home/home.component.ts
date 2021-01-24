import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/response/category.model';
import { CulturalOffer } from 'src/app/core/models/response/cultural-offer.model';
import { CulturalOfferPage } from 'src/app/core/models/response/cultural-offer-page.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private currentCategory = 0;

  culturalOffers: CulturalOfferPage;

  categories: Category[] = [];

  zoom = 2;

  latitude = 0;

  longitude = 0;

  searchValue = '';

  page = 1;

  size = 10;

  constructor(
    private culturalOfferService: CulturalOfferService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.culturalOffers = { content: [], totalElements: 0 };
    this.getAllCategories();
  }

  clickRow(row: CulturalOffer): void {
    if (this.latitude === row.geolocation.lat && this.longitude === row.geolocation.lon) {
      this.latitude = row.geolocation.lat + 0.00001;
      this.longitude = row.geolocation.lon + 0.00001;
    }
    else {
      this.latitude = row.geolocation.lat;
      this.longitude = row.geolocation.lon;
    }
    this.zoom = 6 + Math.random() * 0.1;
  }

  private getAllCategories(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories.sort((a, b) => a.id - b.id);
      this.getCulturalOffersByCategoryAndName(this.categories[0].id, this.searchValue);
    });
  }

  private getCulturalOffersByCategoryAndName(id: number, value: string): void {
    if (!value) {
      this.culturalOfferService.getCulturalOffersByCategory(id.toString(), this.size, this.page - 1).subscribe(culturalOffers => {
        this.culturalOffers = culturalOffers;
      });
    }
    else {
      this.culturalOfferService.findByCategoryIdAndName(id.toString(), value, this.size, this.page - 1).subscribe(culturalOffers => {
        this.culturalOffers = culturalOffers;
      });
    }
  }

  changeTab($event: any): void {
    this.resetRequiredParameters();
    this.currentCategory = $event.index;
    this.getCulturalOffersByCategoryAndName(this.categories[this.currentCategory].id, this.searchValue);
  }

  searchChanged(value: string): void {
    this.searchValue = value;
    this.getCulturalOffersByCategoryAndName(this.categories[this.currentCategory].id, value);
    this.resetRequiredParameters();
  }

  handlePageChange($event: number): void {
    this.resetRequiredParameters();
    this.page = $event;
    this.getCulturalOffersByCategoryAndName(this.categories[this.currentCategory].id, this.searchValue);
  }

  private resetRequiredParameters(): void {
    this.page = 1;
    if (!this.latitude && !this.longitude) {
      this.latitude = this.latitude + 0.00001;
      this.longitude = this.longitude + 0.00001;
    }
    else {
      this.latitude = 0;
      this.longitude = 0;
    }
    if (this.zoom === 2) {
      this.zoom = this.zoom + 0.00001;
    }
    else {
      this.zoom = 2;
    }
  }
}
